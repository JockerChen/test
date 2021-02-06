// 栈是一种遵从先进后出 (LIFO) 原则的有序集合；新添加的或待删除的元素都保存在栈的末尾，
// 称作栈顶，另一端为栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。 通俗来讲，
// 一摞叠起来的书或盘子都可以看做一个栈，我们想要拿出最底下的书或盘子，一定要现将上面的移走才可以。
class Stack {
  constructor() {
    this.items = [];
  }
  push (element) {
    this.items.push(element);
  }
  pop () {
    return this.items.pop();
  }
  // 末位
  get peek () {
    return this.items[this.items.length - 1]
  }

  // 是否为空栈
  get isEmpty () {
    return !this.items.length
  }

  // 尺寸
  get size () {
    return this.items.length
  }

  // 清空栈
  clear () {
    this.items = []
  }

  // 打印栈数据
  print () {
    console.log(this.items.toString())
  }
}