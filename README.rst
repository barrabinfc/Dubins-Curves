=============
Dubins-Curves
=============

About
=====

This software finds the shortest paths between configurations for the Dubins'
car [Dubins51]_, the forward only car-like vehicle with a constrained turning
radius. A good description of the equations and basic strategies for doing this
are described in section 15.3.1 `"Dubins Curves"
<http://planning.cs.uiuc.edu/node821.html>`_ of the book "Planning Algorithms"
[LaValle06]_.

`Demo <http://barrabinfc.github.io/js-dubinscurves/demo.html>`

The approach used to find paths is based on the algebraic solutions published
in [Shkel01]_. However, rather than using angular symmetries to improve
performance, the simpler approach to test all possible solutions is used here. 

|build_status| |coverage| |license|

Usage
=====

The recommended approach is to add `dubins.c` and `dubins.h` to your project
and compile with an appropriate build system.  

The repository includes a basic cmake example that demonstrates how to build
and test the library.

Examples
========

The following code animates `ball` from `[0,0]` with direction `Math.Pi` to point B `[100, 100, -Math.Pi]`, along the shortest path.

.. code-block:: javascript
    
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



The following image shows some example paths, and the heading of the vehicle at
each of the intermediate configurations.

.. image:: ./docs/images/samples.png

Other Version
=============

* There is a MATLAB Mex wrapper of this code on the `MathWorks FileExchange <http://www.mathworks.com.au/matlabcentral/fileexchange/40655-dubins-curve-mex>`_
* There is a Python wrapper of this code available on `GitHub <https://github.com/AndrewWalker/pydubins>`_ and on `PyPI <https://pypi.python.org/pypi/dubins/>`_

Citing
======

If you would like to cite this library in a paper or presentation, the following is recommended:

.. code-block:: bibtex

    @Misc{DubinsCurves,
      author = {Andrew Walker},
      title  = {Dubins-Curves: an open implementation of shortest paths for the forward only car},
      year   = {2008--},
      url    = "https://github.com/AndrewWalker/Dubins-Curves"
    }

Contributors
============

The Dubin's curves library was completed as one small part of [Walker11]_. New
contributions or bug fixes are welcome.

Key contributors to the project include: 

* Francis Valentinis
* Royce Smart - who tested early versions of this code while writing up [Smart08]_.
* Scott Teuscher - who wrote the MATLAB Mex wrapper

License
=======

MIT License. See `LICENSE.txt <LICENSE.txt>`_ for details.

References
==========

.. [Dubins51] Dubins, L.E. (July 1957). "On Curves of Minimal Length with a Constraint on Average Curvature, and with Prescribed Initial and Terminal Positions and Tangents". American Journal of Mathematics 79 (3): 497–516
.. [LaValle06] LaValle, S. M. (2006). "Planning Algorithms". Cambridge University Press
.. [Shkel01] Shkel, A. M. and Lumelsky, V. (2001). "Classification of the Dubins set". Robotics and Autonomous Systems 34 (2001) 179–202
.. [Walker11] Walker, A. (2011). "Hard Real-Time Motion Planning for Autonomous Vehicles", PhD thesis, Swinburne University.
.. [Smart08] Royce, S. (2008). "Evolutionary Control of Autonomous Underwater Vehicles". PhD thesis, RMIT

.. |build_status| image:: https://secure.travis-ci.org/AndrewWalker/Dubins-Curves.png?branch=master
   :target: https://travis-ci.org/AndrewWalker/Dubins-Curves
   :alt: Current build status

.. |coverage| image:: https://codecov.io/gh/AndrewWalker/Dubins-Curves/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/AndrewWalker/Dubins-Curves
   :alt: Code coverage shield

.. |license| image:: https://img.shields.io/badge/License-MIT-blue.svg
   :target: http://opensource.org/licenses/MIT
   :alt: license shield
