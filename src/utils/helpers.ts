export const getNow=()=>{
    return new Date().getTime()
}
export const isServerSide:boolean = typeof window === "undefined";

