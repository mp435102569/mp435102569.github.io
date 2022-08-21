function animate(obj, target, speed, callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var step = (target - obj.offsetTop) / speed;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        // console.log(obj.offsetTop);
        if (obj.offsetTop == target) {
            clearInterval(obj.timer);
            callback && callback();
        }
        obj.style.top = obj.offsetTop + step + 'px';
    }, 15);
}