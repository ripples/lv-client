"use strict";

import {Schema} from "normalizr";

const LectureSchema = new Schema("lecture");

LectureSchema.define({
  idAttribute: "timestamp",
});

export default LectureSchema;
