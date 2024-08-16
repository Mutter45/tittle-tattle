const fn = (v: boolean) => {
	if (v) return 1
	else return 2
}
type MyReturnType<T extends (...args: never[]) => unknown> = T extends (...args: never[]) => infer R ? R : never
type a = MyReturnType<typeof fn> // should be "1 | 2"
