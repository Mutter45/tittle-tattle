const map = new Map<string, any>()

map.set('name', 'XPoet')
map.set('age', 18)
map.set('email', 'i@xpoet.cn')
console.log(map) // Map(3) { 'name' => 'XPoet', 'age' => 18, 'email' => 'i@xpoet.cn' }
console.log(map.has('name')) //--> true
console.log(map.has('address')) //--> false

// get() 测试
console.log(map.get('age')) //--> 18

// keys() 测试
console.log(map.keys()) //--> ["age", "email"]
console.log(map.delete('name'))
console.log(map.size)
