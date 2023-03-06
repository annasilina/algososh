export interface IQueue<T> {
	enqueue: (item: T) => void;
	dequeue: () => void | null;
	getHead: () => number;
	getTail: () => number;
	getSize: () => number;
	getElements: () => (T | null)[] ;
	clear: () => void;
}

export class Queue<T> implements IQueue<T> {
	private container: (T | null)[] = [];
	private head = 0;
	private tail = 0;
	private readonly size: number = 0;
	private length: number = 0

	constructor(size: number) {
		this.size = size;
		this.container = Array(size);
	}

	enqueue = (item: T) => {
		if (this.length >= this.size) {
			throw new Error('Maximum queue size exceeded');
		}

		if (this.tail >= this.size) {
			throw new Error('Maximum queue size exceeded');
			// this.tail = 0;
			// this.container[this.tail] = item;
		}

		this.container[this.tail] = item;
		this.tail++;
		this.length++;
	}

	dequeue = () => {
		if (this.isEmpty()) {
			//throw new Error('No elements in the queue');
			this.clear();
		}

		this.container[this.head] = null;
		this.head++;
		this.length--;
	}

	get peak(): T | null {
		if (this.isEmpty()) {
			throw new Error('No elements in the queue');
		}
		return this.container[this.head % this.size];
	}

	getElements = () => [...this.container];
	getHead = () => this.head;
	getTail = () => this.tail;
	getSize = () => this.size;
	clear = () => {
		this.container = [];
		this.head = 0;
		this.tail = 0;
		this.length = 0;
	}

	isEmpty = () => this.length === 0;
}
