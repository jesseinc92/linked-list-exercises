/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.length++;

    return undefined;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode =  new Node(val);

    if (!this.head) {
      this.tail = newNode;
    } else {
      newNode.next = this.head;
    }
    this.head = newNode;
    this.length++;

    return undefined;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (!this.head) throw new Error('Cannot pop from an empty list.');
  
    const tail = this.tail;
    
    let currentNode = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      return currentNode.val;
    }

    while(currentNode.next) {
      if (currentNode.next === tail) break;
      currentNode = currentNode.next;
    }
    this.tail = currentNode;
    currentNode.next = null;
    this.length--;

    return tail.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) throw new Error('Cannot shift from an empty list.');

    const removedHead = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      return removedHead.val;
    }
    
    this.head = removedHead.next;
    removedHead.next = null;
    this.length--;

    return removedHead.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (!this.head) throw new Error('Empty list.')

    let currentNode = this.head;
    for (let i = 0; i <= idx; i++) {
      if (i === idx) return currentNode.val;
      currentNode = currentNode.next;
    }
    throw new Error('Invalid index.');
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (!this.head) throw new Error('Empty list.')

    let currentNode = this.head;
    for (let i = 0; i <= idx; i++) {
      if (i === idx) {
        currentNode.val = val;
        return undefined;
      }
      currentNode = currentNode.next;
    }
    throw new Error('Invalid index.');
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return undefined;
    }

    let currentNode = this.head;
    let oldNext;
    let addedNode;
    for (let i = 0; i <= idx + 1; i++) {
      if (i === idx - 1) {
        oldNext = currentNode.next;
        currentNode.next = newNode;
      }
      if (i === idx) {
        addedNode = currentNode;
        this.length++;
      }
      if (i === idx + 1) {
        if (!oldNext) this.tail = addedNode;
        addedNode.next = oldNext;
        return undefined;
      }
      currentNode = currentNode.next;
    }
    throw new Error('Invalid index.');
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (!this.head) throw new Error('Empty list');

    if (this.head === this.tail) {
      const removedNode = this.head;
      this.head = null;
      this.tail = null;
      this.length--;
      return removedNode.val;
    }

    let currentNode = this.head;
    let beforeNode;
    let removedNode;
    for (let i = 0; i <= idx + 1; i++) {
      currentNode = currentNode.next;
      if (i === idx - 1) beforeNode = currentNode;
      if (i === idx) removedNode = currentNode;
      if (i === idx + 1) beforeNode.next = currentNode;
    }

    if (removedNode) return removedNode.val;
    throw new Error('Invalid index.');
  }

  /** average(): return an average of all values in the list */

  average() {
    if (!this.head) return 0;

    let currentNode = this.head;
    let totalVal = currentNode.val;
    let nodeCount = 1;
    while (currentNode.next) {
      currentNode = currentNode.next;
      totalVal += currentNode.val;
      nodeCount++;
    }
    return totalVal / nodeCount;
  }
}

module.exports = LinkedList;
