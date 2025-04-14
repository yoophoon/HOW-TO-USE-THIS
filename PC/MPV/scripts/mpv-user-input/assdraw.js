// Ported from:
// https://github.com/mpv-player/mpv/blob/9267600/player/lua/assdraw.lua

//export default AssDraw;
module.exports = {
    AssDraw: (function () {
        var c = 0.551915024494; // circle approximation
        function AssDraw() {
            this.scale = 4;
            this.text = "";
        }
        AssDraw.prototype.new_event = function () {
            // osd_libass.c adds an event per line
            if (this.text.length > 0) {
                this.text += "\n";
            }
        };
        AssDraw.prototype.draw_start = function () {
            this.text = "".concat(this.text, "{\\p").concat(this.scale, "}");
        };
        AssDraw.prototype.draw_stop = function () {
            this.text += "{\\p0}";
        };
        AssDraw.prototype.coord = function (x, y) {
            var scale = Math.pow(2, (this.scale - 1));
            var ix = Math.ceil(x * scale);
            var iy = Math.ceil(y * scale);
            this.text = "".concat(this.text, " ").concat(ix, " ").concat(iy);
        };
        AssDraw.prototype.append = function (s) {
            this.text += s;
        };
        AssDraw.prototype.merge = function (other) {
            this.text += other.text;
        };
        AssDraw.prototype.pos = function (x, y) {
            this.append("{\\pos(".concat(x, ",").concat(y, ")}"));
        };
        AssDraw.prototype.an = function (an) {
            this.append("{\\an".concat(an, "}"));
        };
        AssDraw.prototype.move_to = function (x, y) {
            this.append(" m");
            this.coord(x, y);
        };
        AssDraw.prototype.line_to = function (x, y) {
            this.append(" l");
            this.coord(x, y);
        };
        AssDraw.prototype.bezier_curve = function (x1, y1, x2, y2, x3, y3) {
            this.append(" b");
            this.coord(x1, y1);
            this.coord(x2, y2);
            this.coord(x3, y3);
        };
        AssDraw.prototype.rect_ccw = function (x0, y0, x1, y1) {
            this.move_to(x0, y0);
            this.line_to(x0, y1);
            this.line_to(x1, y1);
            this.line_to(x1, y0);
        };
        AssDraw.prototype.rect_cw = function (x0, y0, x1, y1) {
            this.move_to(x0, y0);
            this.line_to(x1, y0);
            this.line_to(x1, y1);
            this.line_to(x0, y1);
        };
        AssDraw.prototype.hexagon_cw = function (x0, y0, x1, y1, r1, r2) {
            if (r2 === void 0) { r2 = r1; }
            this.move_to(x0 + r1, y0);
            if (x0 !== x1) {
                this.line_to(x1 - r2, y0);
            }
            this.line_to(x1, y0 + r2);
            if (x0 !== x1) {
                this.line_to(x1 - r2, y1);
            }
            this.line_to(x0 + r1, y1);
            this.line_to(x0, y0 + r1);
        };
        AssDraw.prototype.hexagon_ccw = function (x0, y0, x1, y1, r1, r2) {
            if (r2 === void 0) { r2 = r1; }
            this.move_to(x0 + r1, y0);
            this.line_to(x0, y0 + r1);
            this.line_to(x0 + r1, y1);
            if (x0 !== x1) {
                this.line_to(x1 - r2, y1);
            }
            this.line_to(x1, y0 + r2);
            if (x0 !== x1) {
                this.line_to(x1 - r2, y0);
            }
        };
        AssDraw.prototype.round_rect_cw = function (x0, y0, x1, y1, r1, r2) {
            if (r2 === void 0) { r2 = r1; }
            var c1 = c * r1; // circle approximation
            var c2 = c * r2; // circle approximation
            this.move_to(x0 + r1, y0);
            this.line_to(x1 - r2, y0); // top line
            if (r2 > 0) {
                this.bezier_curve(x1 - r2 + c2, y0, x1, y0 + r2 - c2, x1, y0 + r2); // top right corner
            }
            this.line_to(x1, y1 - r2); // right line
            if (r2 > 0) {
                this.bezier_curve(x1, y1 - r2 + c2, x1 - r2 + c2, y1, x1 - r2, y1); // bottom right corner
            }
            this.line_to(x0 + r1, y1); // bottom line
            if (r1 > 0) {
                this.bezier_curve(x0 + r1 - c1, y1, x0, y1 - r1 + c1, x0, y1 - r1); // bottom left corner
            }
            this.line_to(x0, y0 + r1); // left line
            if (r1 > 0) {
                this.bezier_curve(x0, y0 + r1 - c1, x0 + r1 - c1, y0, x0 + r1, y0); // top left corner
            }
        };
        AssDraw.prototype.round_rect_ccw = function (x0, y0, x1, y1, r1, r2) {
            if (r2 === void 0) { r2 = r1; }
            var c1 = c * r1; // circle approximation
            var c2 = c * r2; // circle approximation
            this.move_to(x0 + r1, y0);
            if (r1 > 0) {
                this.bezier_curve(x0 + r1 - c1, y0, x0, y0 + r1 - c1, x0, y0 + r1); // top left corner
            }
            this.line_to(x0, y1 - r1); // left line
            if (r1 > 0) {
                this.bezier_curve(x0, y1 - r1 + c1, x0 + r1 - c1, y1, x0 + r1, y1); // bottom left corner
            }
            this.line_to(x1 - r2, y1); // bottom line
            if (r2 > 0) {
                this.bezier_curve(x1 - r2 + c2, y1, x1, y1 - r2 + c2, x1, y1 - r2); // bottom right corner
            }
            this.line_to(x1, y0 + r2); // right line
            if (r2 > 0) {
                this.bezier_curve(x1, y0 + r2 - c2, x1 - r2 + c2, y0, x1 - r2, y0); // top right corner
            }
        };
        return AssDraw;
    }()),
}
