export interface IStack<T> {
	push: (item: T) => void;
	pop: () => void | null;
	clear: () => void;
	getSize: () => number;
	getElements: () => Array<T>;
}

export class Stack<T> implements IStack<T> {
	private container: Array<T> = [];

	get peak(): T | null {
		if (this.container.length) {
			return this.container[this.container.length - 1]
		}
		return null;
	}

	push = (item: T): void => {
		this.container.push(item);
	}

	pop = (): void | null => {
		if (this.container.length !== 0) {
			this.container.pop();
		}
		return null;
	}

	getSize = () => this.container.length;

	getElements = () => this.container;

	clear = () => this.container = [];
}