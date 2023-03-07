import {ElementStates} from "../../types/element-states";

export type TListItem<T> = {
	value: T;
	state: ElementStates;
}

export class Node<T> {
	value: T
	next: Node<T> | null
	constructor(value: T, next?: Node<T> | null) {
		this.value = value;
		this.next = (next === undefined ? null : next);
	}
}

interface ILinkedList<T> {
	append: (element: T) => void;
	prepend: (element: T) => void;
	insertByIndex: (element: T, index: number) => void;
	removeByIndex: (index: number) => void;
	removeHead: () => void;
	removeTail: () => void;
	toArray: () => Array<TListItem<T>>;
	getSize: () => number;
	clear: () => void;
	//getHead: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
	private head: Node<T> | null;
	private size: number;
	private readonly initElements: Array<T> | undefined;
	constructor(initElements?: Array<T>) {
		this.head = null;
		this.size = 0;
		this.initElements = initElements;
		if (this.initElements) {
			this._getInitElements(this.initElements);
		}
	}

	private _getInitElements = (elementsArr: Array<T>) => {
		elementsArr.forEach(element => this._createInitList(element));
	}

	private _createInitList = (element: T) => {
		const node = new Node(element);
		if (this.head === null) {
			this.head = node;
		} else {
			let curr = this.head;

			while (curr.next) {
				curr = curr.next;
			}

			curr.next = node;
		}
		this.size++;
	}

	append = (element: T) => {
		const node = new Node(element);
		let curr;

		if (this.head === null) {
			this.head = node;
		} else {
			curr = this.head;
			while (curr.next) {
				curr = curr.next;
			}
			curr.next = node;
		}
		this.size++;
	}

	prepend = (element: T) => {
		const node = new Node(element);

		 if (this.head === null) {
			 this.head = node;
		 } else {
			 node.next = this.head;
			 this.head = node;
		 }
		this.size++;
	}

	insertByIndex = (element: T, index: number) => {
		if (index < 0 || index > this.size) {
			throw new Error('Invalid index');
		} else {
			const node = new Node(element);
			if (this.head === null) {
				this.head = node;
			} else {
				if (index === 0) {
					node.next = this.head;
					this.head = node;
				} else {
					let curr = this.head;

					for (let i = 1; i < index; i++) {
						if (curr.next) curr = curr.next;
					}

					node.next = curr.next;
					curr.next = node;
				}
			}

			this.size++;
		}
	}

	removeByIndex = (index: number) => {
		if (index < 0 || index > this.size) {
			throw new Error('Invalid index');
		} else {
			if (this.head) {
				if (index === 0) {
					return this.removeHead();
				} else {
					let curr = this.head;

					for (let i = 1; i < index; i++) {
						if (curr.next) {
							curr = curr.next;
						}
					}

					curr.next = curr.next?.next ?? null;
				}
			}
			this.size--;
		}
	}

	removeHead = () => {
		if (this.size === 1) {
			this.clear();
		}

		if (this.head) {
			this.head = this.head.next;
			this.size--;
		}
	}

	removeTail = () => {
		if (this.size === 1) {
			this.clear();
		}

		if (this.head) {
			let curr = this.head;

			for (let i = 1; i < this.size - 1; i++) {
				if (curr.next) {
					curr = curr.next;
				}
			}

			curr.next = null;
			this.size--;
		}
	}

	toArray = () => {
		const res = [];
		let curr = this.head;
		while (curr) {
			res.push({value: curr.value, state: ElementStates.Default});
			curr = curr.next;
		}
		return res;
	}

	clear = () => {
		this.head = null;
		this.size = 0;
	}

	getSize = () => this.size;
}