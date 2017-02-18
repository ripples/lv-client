"use strict";

/*
 * StateConstants
 * this needs to be wiped to {} once we actually hook into the db
 */

export const DefaultState = {
  user: {},
  courses: [
    {
      id: "CMPSCI_377",
      title: "COMPSCI 377: Operating Systems",
      lectures: [
        "cs377Lecture01", "cs377Lecture02", "cs377Lecture03",
        "cs377Lecture04", "cs377Lecture05", "cs377Lecture06"
      ]
    },
    {
      id: "PHYS_151_02",
      title: "PHYSICS 151-02: Physics I",
      lectures: ["phys15102Lecture01"]
    }
  ],
  lectures: [
    {
      lectureId: "cs377Lecture01",
      title: "Lecture 01",
      date: 1476333797611
    },
    {
      lectureId: "cs377Lecture02",
      title: "Lecture 02",
      date: 1476333797611
    },
    {
      lectureId: "cs377Lecture03",
      title: "Lecture 03",
      date: 1476333797611
    },
    {
      lectureId: "cs377Lecture04",
      title: "Lecture 04",
      date: 1476333797611
    },
    {
      lectureId: "cs377Lecture05",
      title: "Lecture 05",
      date: 1476333797611
    },
    {
      lectureId: "cs377Lecture06",
      title: "Lecture 06",
      date: 1476333797611
    },
    {
      lectureId: "phys15102Lecture01",
      title: "Lecture 01",
      date: 1476333797611
    },
    {
      lectureId: "testlecture100",
      title: "Lecture 100",
      date: 1476333797611
    }
  ],
  media: {}
};
