import {getCourses} from "./courses";

// TODO error handeling.... .catch( error => {})
export function getCoursesAction() {
  return function(dispatch) {
    getCourses().then(
      response => {
        console.log("response.data from actions.js", response.data);
        dispatch({
          type: "GET_COURSES_FULFILLED",
          payload: response.data
        });
      }
    );
  };
}
