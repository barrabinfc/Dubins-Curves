=====
About
=====

This software finds the shortest paths between configurations for the Dubins' car [Dubins51]_, the forward only car-like vehicle with a constrained turning radius. A good description of the equations and basic strategies for doing this are described in section 15.3.1 `"Dubins Curves" <http://planning.cs.uiuc.edu/node821.html>`_ of the book "Planning Algorithms" [LaValle06]_.

The approach used to find paths is based on the algebraic solutions published in [Shkel01]_. However, rather than using angular symmetries to improve performance, the simpler approach to test all possible solutions is used here. 

Examples
========

The following code snippet demonstrates how to generate intermediate points along the shortest path between a pair of configuration (x, y, theta).

.. code-block:: c

    #include "dubins.h"
    #include <stdio.h>

    int printConfiguration(double q[3], double x, void* user_data) {
        printf("%f, %f, %f, %f\n", q[0], q[1], q[2], x);
        return 0;
    }

    int main()
    {
        double q0[] = { 0,0,0 };
        double q1[] = { 4,4,3.142 };
        double turning_radius = 1.0;
        DubinsPath path;
        dubins_init( q0, q1, turning_radius, &path);
        dubins_path_sample_many( &path, printConfiguration, 0.1, NULL);
        return 0;
    }

The following image shows some example paths, and the heading of the    vehicle at each of the intermediate configurations.

.. imagedocs/images/samples.png


License
=======

MIT License. See LICENSE.txt for more details.

Citing
======

If you would like to cite this library in a paper or presentation, the following is recommended:

* **Author:** Andrew Walker
* **Title:** Dubins-Curves: an open implementation of shortest paths for the forward only car
* **Year:** 2008 -
* **URL:** `https://github.com/AndrewWalker/Dubins-Curves`_

Here’s an example of a BibTeX entry:

.. code-block:: bibtex

    @Misc{,
      author = {Andrew Walker},
      title  = {Dubins-Curves: an open implementation of shortest paths for the forward only car},
      year   = {2008--},
      url    = "https://github.com/AndrewWalker/Dubins-Curves"
    }

Contributions
=============

This work was completed as part of my PhD thesis [Walker11]_. 

* Francis Valentinis 
* Royce Smart - who tested early versions of this code while writing up [Smart08]_.

References
==========

.. [Dubins51] Dubins, L.E. (July 1957). "On Curves of Minimal Length with a Constraint on Average Curvature, and with Prescribed Initial and Terminal Positions and Tangents". American Journal of Mathematics 79 (3): 497–516
.. [LaValle06] LaValle, S. M. (2006). "Planning Algorithms". Cambridge University Press
.. [Shkel01] Shkel, A. M. and Lumelsky, V. (2001). "Classification of the Dubins set". Robotics and Autonomous Systems 34 (2001) 179–202
.. [Walker11] Walker, A. (2011). "Hard Real-Time Motion Planning for Autonomous Vehicles", Swinburne University.
.. [Smart08] Royce, S. (2008). "Evolutionary Control of Autonomous Underwater Vehicles". RMIT

