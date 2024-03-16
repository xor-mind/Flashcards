(function () {
    // simple drag
    function sdrag(onDrag, onStop, direction) {

        var startX = 0;
        var startY = 0;
        var el = this;
        var dragging = false;

        function move(e) {

            // Check if it's a touch event
            if (e.touches) e = e.touches[0];

            var fix = {};
            onDrag && onDrag(el, e.pageX, startX, e.pageY, startY, fix);
            if ('vertical' !== direction) {
                var pageX = ('pageX' in fix) ? fix.pageX : e.pageX;
                if ('startX' in fix) {
                    startX = fix.startX;
                }
                if (false === ('skipX' in fix)) {
                    el.style.left = (pageX - startX) + 'px';
                }
            }
            if ('horizontal' !== direction) {
                var pageY = ('pageY' in fix) ? fix.pageY : e.pageY;
                if ('startY' in fix) {
                    startY = fix.startY;
                }
                if (false === ('skipY' in fix)) {
                    el.style.top = (pageY - startY) + 'px';
                }
            }
        }

        function startDragging(e) {
            // Prevent mobile browsers from processing mouse events after touch events
            e.preventDefault();

            // Check if it's a touch event and get the first touch point
            if (e.touches) e = e.touches[0];

            if (e.currentTarget instanceof HTMLElement || e.currentTarget instanceof SVGElement) {
                dragging = true;
                var left = el.style.left ? parseInt(el.style.left) : 0;
                var top = el.style.top ? parseInt(el.style.top) : 0;
                startX = e.pageX - left;
                startY = e.pageY - top;
                window.addEventListener('mousemove', move);
                window.addEventListener('touchmove', move); // Add touchmove event listener
            }
            else {
                throw new Error("Your target must be an html element");
            }
        }

        // Add both mousedown and touchstart event listeners
        this.addEventListener('mousedown', startDragging);
        this.addEventListener('touchstart', startDragging);

        function stopDragging(e) {
            if (true === dragging) {
                dragging = false;
                // Remove both event listeners
                window.removeEventListener('mousemove', move);
                window.removeEventListener('touchmove', move); // Remove touchmove event listener
                if (e.touches) e = e.changedTouches[0]; // Handle touch events
                onStop && onStop(el, e.pageX, startX, e.pageY, startY);
            }
        }

        // Add mouseup and touchend event listeners
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('touchend', stopDragging);
    }

    Element.prototype.sdrag = sdrag;
})();
