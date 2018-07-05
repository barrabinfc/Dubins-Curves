function clamp(v, min, max) {
    return Math.max(Math.min(v, max), min);
  }

  function map(v, i1, i2, o1, o2) {
    return o1 + (o2 - o1) * ((v - i1) / (i2 - i1));
  }

  function cmap(v, i1, i2, o1, o2) {
    return clamp(map(v, i1, i2, o1, o2), o1, o2);
  }        

  function makePoint(x, y) {
      if (arguments.length <= 1) {
          y = x.y;
          x = x.x;
      }

      var v = new Two.Vector(x, y);
      v.position = new Two.Vector().copy(v);

      return v;
  }
  function generateGrid() {

      var two = new Two({
          type: Two.Types.canvas,
          width: 16,
          height: 16,
          ratio: 2
      });

      var width = two.width / 2;
      var height = two.height / 2;

      var background = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
      background.noStroke().fill = '#efefef';

      var c = two.makeCircle(two.width / 2, two.height / 2, 0.5);
      c.noStroke().fill = '#999';

      two.update();

      return two.renderer.domElement.toDataURL('image/png');
  }