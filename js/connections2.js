CSS.registerProperty({
    name: '--connections-particleColor',
    syntax: '<color>',
    inherits: false,
    initialValue: rgb(150,180,200)
});

CSS.registerProperty({
    name: '--connections-lineColor',
    syntax: '<color>',
    inherits: false,
    initialValue: rgb(150,180,200)
});

CSS.registerProperty({
    name: '--connections-particleAmount',
    syntax: '<number>',
    inherits: false,
    initialValue: 40
});

CSS.registerProperty({
    name: '--connections-defaultRadius',
    syntax: '<number>',
    inherits: false,
    initialValue: 2
});

CSS.registerProperty({
    name: '--connections-variantRadius',
    syntax: '<number>',
    inherits: false,
    initialValue: 1
});

CSS.registerProperty({
    name: '--connections-linkRadius',
    syntax: '<number>',
    inherits: false,
    initialValue: 60
});


(() => {
    const worklet = `
        var n = ["--connections-particleColor", "--connections-lineColor", "--connections-particleAmount", "--connections-defaultRadius", "--connections-variantRadius", "--connections-linkRadius"];
        registerPaint("connections", function () {
            function t() {}
            var o, r = t.prototype;
            return r.parseProps = function (t) {
                return n.map(function (n) {
                    return t.get(n).toString().trim() || void 0
                })
            }, r.checkDistance = function (n, t, o, r) {
                return Math.sqrt(Math.pow(o - n, 2) + Math.pow(r - t, 2))
            }, r.paint = function (n, t, o) {
                for (var r = this, e = t.width, i = t.height, a = this.parseProps(o), c = a[0], u = void 0 === c ? "rgb(74,74,74)" : c, s = a[1], h = a[2], l = void 0 === h ? e * i / 1e3 : h, d = a[3], v = void 0 === d ? 1.5 : d, f = a[4], p = void 0 === f ? 3 : f, g = a[5], y = void 0 === g ? 80 : g, b = [], m = (void 0 === s ? "rgb(76,76,76)" : s).match(/\\d+/g), M = m[0], P = m[1], k = m[2], x = function (t, o) {
                        var r = +v + Math.random() * +p;
                        return n.beginPath(), n.arc(t, o, r, 0, 2 * Math.PI), n.fillStyle = u, n.fill(), {
                            x: t,
                            y: o
                        }
                    }, w = function (t) {
                        for (var o = 0; o < l; o++) {
                            var e = 1 - r.checkDistance(t.x, t.y, b[o].x, b[o].y) / y;
                            e > 0 && (n.lineWidth = .5, n.strokeStyle = "rgba(" + M + ", " + P + ", " + k + ", " + e + ")", n.beginPath(), n.moveTo(t.x, t.y), n.lineTo(b[o].x, b[o].y), n.closePath(), n.stroke())
                        }
                    }, R = 0; R < l; R++) {
                    var S = Math.round(Math.random() * e),
                        C = Math.round(Math.random() * i);
                    b.push(x(S, C))
                }
                for (var D = 0; D < l; D++) w(b[D])
            }, (o = [{
                key: "inputProperties",
                get: function () {
                    return n
                }
            }]) && function (n, t) {
                for (var o = 0; o < t.length; o++) {
                    var r = t[o];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(n, r.key, r)
                }
            }(t, o), t
        }`


    const workletBlob = URL.createObjectURL(new Blob([worklet], {
        type: 'application/javascript'
    }))

    window.CSS.paintWorklet.addModule(workletBlob)

})()