"use strict";

import {Schema, arrayOf} from "normalizr";

import LectureSchema from "./LectureSchema";

const CourseSchema = new Schema("course");

CourseSchema.define({
  idAttribute: "id",
  lectures: arrayOf(LectureSchema)
});

export default CourseSchema;
