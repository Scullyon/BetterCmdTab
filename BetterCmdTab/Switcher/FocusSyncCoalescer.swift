import Foundation

/// Per-pid coalescing for focused-window resolves with no dropped trailing
/// change. A focus-change notification kicks an off-main AX resolve; more
/// notifications for the same pid arriving mid-flight used to be silently
/// dropped, so the *final* focused window could be missed entirely — e.g. an
/// app posting main-window-changed (old window) immediately before
/// focused-window-changed (new window) only ever resolved the old one (#85).
/// Instead of dropping, a mid-flight change is latched and the caller re-runs
/// one resolve once the flight lands, so a burst still costs at most two AX
/// round-trips but always converges on the latest state.
struct FocusSyncCoalescer {
    private var inFlight: Set<pid_t> = []
    /// Latched changes, keyed by pid, holding the stamp of the newest one so the
    /// re-run records the window at the time the change happened.
    private var pending: [pid_t: UInt64] = [:]

    /// A focus change stamped `stamp` arrived for `pid`. Returns true when the
    /// caller should start a resolve; false when one is already in flight (the
    /// change is latched and `finish` will ask for a re-run).
    mutating func begin(_ pid: pid_t, at stamp: UInt64) -> Bool {
        guard !inFlight.contains(pid) else {
            pending[pid] = max(pending[pid] ?? 0, stamp)
            return false
        }
        inFlight.insert(pid)
        return true
    }

    /// True when a change for `pid` arrived while its resolve was in flight.
    func hasPending(_ pid: pid_t) -> Bool {
        pending[pid] != nil
    }

    /// The in-flight resolve for `pid` landed. Returns the stamp of the newest
    /// change that arrived mid-flight when the caller should resolve again.
    mutating func finish(_ pid: pid_t) -> UInt64? {
        inFlight.remove(pid)
        return pending.removeValue(forKey: pid)
    }
}
