StartTest(function(t) {
    t.chain(
        { waitFor: 'CQ', args: 'navigationview'},
        function(next) {
            t.pass('Displays main navigation view');
            t.ok(t.cq1('maintabpanel'), 'Tab panel renders');
        }
    );
})
