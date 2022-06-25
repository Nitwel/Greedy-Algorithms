let count = 0

export default function counter(increment = true) {
    if(increment) count++
    return count
}