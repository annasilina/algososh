import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./queue.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {Queue} from "./Queue";
import {ElementStates} from "../../types/element-states";
import {HEAD, TAIL} from "../../constants/element-captions";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {clearInput} from "../../utils/clearInput";

type TQueueItem = {
	value?: string,
	state: ElementStates,
}

export const QueuePage: React.FC = () => {
	const emptyQueue = Array.from({length: 7}, () => ({value: '', state: ElementStates.Default}));

	const [queue, setQueue] = useState(new Queue<TQueueItem>(7));
	const [visualArray, setVisualArray] = useState<TQueueItem[]>(emptyQueue);
	const [inputValue, setInputValue] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleAddButton = async () => {
		setIsLoading(true);
		queue.enqueue({
			value: inputValue,
			state: ElementStates.Default,
		})
		setQueue(queue);
		visualArray[queue.getTail() - 1] = {value: '', state: ElementStates.Changing};
		setVisualArray([...visualArray]);
		visualArray[queue.getTail() - 1] = {value: inputValue, state: ElementStates.Changing};
		await delay(SHORT_DELAY_IN_MS);
		setVisualArray([...visualArray]);
		visualArray[queue.getTail() - 1].state = ElementStates.Default;
		setVisualArray([...visualArray]);
	}

	const handleDeleteButton = async () => {
		setIsLoading(true);
		visualArray[queue.getHead()].state = ElementStates.Changing;
		setVisualArray([...visualArray]);
		await delay(SHORT_DELAY_IN_MS);
		queue.dequeue();
		setQueue(queue);
		visualArray[queue.getHead() - 1] = {
			value: '',
			state: ElementStates.Default
		};
		setVisualArray([...visualArray]);
		if (queue.isEmpty()) {
			queue.clear();
			setQueue(queue);
			setVisualArray(emptyQueue);
		}
	}

	const handleClearButton = () => {
		queue.clear();
		setQueue(queue);
		setVisualArray(emptyQueue);
	}

	const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
		setInputValue(evt.target.value);
	}

	return (
		<SolutionLayout title='Очередь'>
			<section className={styles.container}>
				<div className={styles.inputContainer}>
					<Input
						placeholder='Введите символы'
						value=''
						type='text'
						maxLength={4}
						isLimitText={true}
						extraClass={styles.input}
						disabled={isLoading}
						onChange={handleInputChange}
						id='input'
					/>
					<Button
						text='Добавить'
						extraClass={styles.btn}
						disabled={isLoading || !inputValue || queue.getTail() >= 7}
						type='button'
						onClick={() =>
							handleAddButton()
								.then(() => {
									setIsLoading(false);
									clearInput('input', setInputValue);
								})}
					></Button>
					<Button
						text='Удалить'
						extraClass={styles.btn}
						disabled={isLoading || queue.isEmpty()}
						type='button'
						onClick={() =>
							handleDeleteButton()
								.then(() => setIsLoading(false))}
					></Button>
				</div>
				<Button
					text='Очистить'
					extraClass={styles.btn}
					disabled={isLoading || queue.isEmpty()}
					type='button'
					onClick={handleClearButton}
				></Button>
			</section>
			<ul className={styles.circles}>
				{visualArray && visualArray.map((element, index) => (
					<li key={index}>
						<Circle
							letter={element.value}
							head={index === queue.getHead() && !queue.isEmpty() ? HEAD : undefined}
							index={index}
							state={element.state}
							tail={index === queue.getTail() - 1 && !queue.isEmpty() ? TAIL : undefined}
						/>
					</li>
				))}
			</ul>
		</SolutionLayout>
	);
};
