let count = 0

export function counter(increment = true) {
    if(increment) count++
    return count
}