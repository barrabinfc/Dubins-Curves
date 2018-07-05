# Dubins-Curves

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

> This software finds the shortest paths between configurations for the [Dubins' car](Dubins51), the forward only car-like vehicle with a constrained turning radius.

Javascript wrapper around [Andrew Walker C Code](https://github.com/AndrewWalker/Dubins-Curves), compiled via `WebAssembly`.
Very useful for organic animation from point A to B, correctly respecting the car orientation. 

A good description of the equations and basic strategies for doing this are described in [section 15.3.1 "Dubins Curves" of the book "Planning Algorithms"][LaValle06]

## Examples

The following code animates `ball` from `[0,0]` with direction `Math.Pi` to point B `[100, 100, -Math.Pi]`, along the shortest path.

```js
    let start = null
    let ball = document.querySelector('#ball');

    /* Arguments: [x0,y1,angle0], [x1,y1,angle1], radius */
    let path = DubinsAPI.init( [0,   0,    Math.Pi], 
                            [200, 200, -Math.Pi], 50 );

    /*
    * Interpolate from 0 to path.length
    */
    function animate( time ){
        if(!start) start = time

        // Sample position at current time
        let t = (time - start)/1000
        let [mx,my,angle] = DubinsAPI.sample( path , t )
        
        // Animate using CSS Transforms for better performance
        let transRot  = `rotate(${angle.toFixed(2)}rad)`
        let transPos  = `translate(${mx.toFixed(2)}px, ${my.toFixed(2)}px)`
        let transform = `${transPos} ${transRot}`

        ball.style.transform = transform 
        ball.style.webkitTransform = transform
        
        if(t < path.length){
            requestAnimationFrame(animate)
        }
    }
    requestAnimationFrame(animate)
```

The following image shows some example paths, and the heading of the    vehicle at each of the intermediate configurations.

![example](./docs/images/samples.png "Example")

## Other Version

* [The original C Version by Andrew Walker](https://github.com/AndrewWalker/Dubins-Curves)
* There is a MATLAB Mex wrapper of this code on the [MathWorks FileExchange](http://www.mathworks.com.au/matlabcentral/fileexchange/40655-dubins-curve-mex>)
* There is a Python wrapper of this code available on [GitHub](https://github.com/AndrewWalker/pydubins) and on [PyPI](https://pypi.python.org/pypi/dubins/)
* There is a Javascript wrapper of this code available on [Github](

## Citing

If you would like to cite this library in a paper or presentation, the following is recommended:

* **Author:** Andrew Walker
* **Title:** Dubins-Curves: an open implementation of shortest paths for the forward only car
* **Year:** 2008 -
* **URL:** `https://github.com/AndrewWalker/Dubins-Curves`

Here’s an example of a BibTeX entry:

```bibtex

    @Misc{DubinsCurves,
      author = {Andrew Walker},
      title  = {Dubins-Curves: an open implementation of shortest paths for the forward only car},
      year   = {2008--},
      url    = "https://github.com/AndrewWalker/Dubins-Curves"
    }
```

## Contributions

This work was completed as part of ["Hard Real-Time Motion Planning for Autonomous Vehicles", PhD thesis, Swinburne University.][Walker11] 

* Francis Valentinis
* Royce Smart - who tested early versions of this code while writing up his [thesis][Smart08].
* Scott Teuscher - who wrote the MATLAB Mex wrapper

## License

**MIT License**. See `LICENSE.txt` for details.

## References

* **Dubins, L.E. (July 1957).** ["On Curves of Minimal Length with a Constraint on Average Curvature, and with Prescribed Initial and Terminal Positions and Tangents"][Dubins51] . American Journal of Mathematics 79 (3): 497–516
* **Shkel, A. M. and Lumelsky, V. (2001)**. ["Classification of the Dubins set" ][Shkel01]. Robotics and Autonomous Systems 34 (2001) 179–202
* **Walker, A. (2011)**. ["Hard Real-Time Motion Planning for Autonomous Vehicles"][Walker11], PhD thesis, Swinburne University.
* **Royce, S. (2008).** ["Evolutionary Control of Autonomous Underwater Vehicles"][Smart08]. PhD thesis, RMIT
* **LaValle, S. M. (2006).** ["Planning Algorithms"][LaValle06]. Cambridge University Press

[Walker11]: https://www.researchgate.net/profile/Mohamed_Mourad_Lafifi/post/Where_can_I_find_source_code_for_Prob_Roadmap_Prob_and_Inevitable_Collision_States_Nearness_Diagram_Prob_Velocity_Obstacle_algos_in_Robot_Motion/attachment/59d63f5079197b807799bc3e/AS%3A426857221890050%401478782100426/download/Andrew+Walker+Thesis.pdf
[Smart08]: https://pdfs.semanticscholar.org/835b/35185fbd13e24d042152a98f326a7848a602.pdf
[Shkel01]: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.726.6240&rep=rep1&type=pdf
[Dubins51]: https://msp.org/pjm/1961/11-2/pjm-v11-n2-p07-p.pdf
[LaValle06]: http://planning.cs.uiuc.edu/node821.html