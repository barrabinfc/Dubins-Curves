class Worm {
    constructor() {
        let destiny =
        this.animPath = DubinsAPI.init([ 0, 0, 0], [200, 100, -Math.PI/2], 50 )
        this.animLength = this.animPath.length

        this.vertices = [
            [0, -50],
            [50,  0],
            [0,  50],
            [-50, 0],
            [0, -50] ].map(_ => makePoint(..._  ))
        this.path = two.makePath(this.vertices, true)
        //this.path.fill = 'rgba(0,200,255,0.75)';
        this.path.noFill()
        this.path.stroke = '#1C765B';
        this.path.linewidth = 20;

        this.group = two.makeGroup(this.path)
        this.group.translation.set(two.width / 2, two.height / 2);
    }

    update() {
        // Follow the head
        for (var i = this.path.vertices.length - 1; i > 0; i--) {
            let prev = this.path.vertices[i - 1]
            let curr = this.path.vertices[i]
            curr.set(prev.x, prev.y)
        }
    }

    setHead(headPos_x, headPos_y) {
        this.path.vertices[0].set(headPos_x, headPos_y)
    }
}
