module.exports = {

    /* number of previous sessions to check */
    planSessionWindowSize : 5,

    /* interval for checking plan session creation, completion, and running
    *  session manager check if there is a scheduled plan
    *  for every time interval denoted by "planSessionCheckSchedule"
    * */
    planSessionCheckSchedule : "every 30 seconds",

    /**
     * session manager checks every time period ,that is
     * determined by this variable, to execute if there is
     * a eligible task to execute.
     */
    taskInstanceStartSchedule: "every 20 seconds"



};