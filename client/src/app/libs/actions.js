import {getCourses} from "./courses";

// TODO error handeling.... .catch( error => {})
export function getCoursesAction() {
  return function(dispatch) {
    getCourses().then(
      response => {
        dispatch({
          type: "GET_COURSES_FULFILLED",
          payload: response.data
        });
      }
    );
  };
}
