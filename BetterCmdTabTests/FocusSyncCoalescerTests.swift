import Testing
@testable import BetterCmdTab

@Suite("FocusSyncCoalescer")
struct FocusSyncCoalescerTests {

    @Test("a change mid-flight is latched and re-run with its own stamp")
    func latchedChangeKeepsNewestStamp() {
        var coalescer = FocusSyncCoalescer()
        let first = coalescer.begin(1, at: 10)
        let second = coalescer.begin(1, at: 30)
        let third = coalescer.begin(1, at: 20) // an older change landing late
        #expect(first)
        #expect(!second)
        #expect(!third)
        #expect(coalescer.hasPending(1))
        let rerun = coalescer.finish(1)
        #expect(rerun == 30)
        #expect(!coalescer.hasPending(1))
    }

    @Test("a flight with no latched change asks for no re-run")
    func quietFlightFinishes() {
        var coalescer = FocusSyncCoalescer()
        let started = coalescer.begin(1, at: 10)
        let rerun = coalescer.finish(1)
        let restarted = coalescer.begin(1, at: 20)
        #expect(started)
        #expect(rerun == nil)
        #expect(restarted)
    }

    @Test("pids coalesce independently")
    func pidsAreIndependent() {
        var coalescer = FocusSyncCoalescer()
        let first = coalescer.begin(1, at: 10)
        let other = coalescer.begin(2, at: 11)
        #expect(first)
        #expect(other)
        #expect(!coalescer.hasPending(2))
    }
}
