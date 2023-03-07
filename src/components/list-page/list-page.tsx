import React, {ChangeEvent, useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {LinkedList, TListItem} from "./LinkedList";
import styles from "./list.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";
import {HEAD, TAIL} from "../../constants/element-captions";
import {delay} from "../../utils/delay";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";
import {ElementStates} from "../../types/element-states";
import {clearInput} from "../../utils/clearInput";

export const ListPage: React.FC = () => {
	const list = useMemo(() =>
			new LinkedList<string>(['0', '34', '8', '1'])
		, []);

	const [visualArr, setVisualArr] = useState<TListItem<string>[]>(list.toArray());
	const [elementInputValue, setElementInputValue] = useState<string>('');
	const [indexInputValue, setIndexInputValue] = useState<number | ''>('');
	const [isAddToHead, setIsAddToHead] = useState<boolean>(false);
	const [isAddToTail, setIsAddToTail] = useState<boolean>(false);
	const [isDelFromHead, setIsDelFromHead] = useState<boolean>(false);
	const [isDelFromTail, setIsDelFromTail] = useState<boolean>(false);
	const [isAddByIndex, setIsAddByIndex] = useState<boolean>(false);
	const [isDelByIndex, setIsDelByIndex] = useState<boolean>(false);
	const [isAllLoading, setIsAllLoading] = useState<boolean>(false);
	const [tempElementValue, setTempElementValue] = useState<string>('');
	const [newIndex, setNewIndex] = useState<number>();
	const [isInvalidIndex, setIsInvalidIndex] = useState<boolean>(false);

	const handleAddElementInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setElementInputValue(e.target.value);
	}

	const handlePointIndexInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setIndexInputValue(Number(e.target.value));
	}

	const addToHead = async () => {
		if (elementInputValue) {
			clearInput('element-input');
			setIsAddToHead(true);
			setIsAllLoading(true);

			await delay(SHORT_DELAY_IN_MS);
			list.prepend(elementInputValue);
			const arr = list.toArray();
			arr[0].state = ElementStates.Modified;

			setIsAddToHead(false);
			setVisualArr(arr);

			await delay(SHORT_DELAY_IN_MS);
			arr[0].state = ElementStates.Default;
			setVisualArr(arr);
		}
	}

	const addToTail = async () => {
		if (elementInputValue) {
			clearInput('element-input');
			setIsAddToTail(true);
			setIsAllLoading(true);

			await delay(SHORT_DELAY_IN_MS);
			list.append(elementInputValue);
			const arr = list.toArray();
			arr[arr.length - 1].state = ElementStates.Modified;

			setIsAddToTail(false);
			setVisualArr(arr);

			await delay(SHORT_DELAY_IN_MS);
			arr[arr.length - 1].state = ElementStates.Default;
			setVisualArr(arr);
		}
	}

	const delFromHead = async () => {
		setIsDelFromHead(true);
		setIsAllLoading(true);

		const arr = list.toArray();
		setTempElementValue(arr[0].value);
		arr[0].value = '';
		setVisualArr(arr);

		await delay(SHORT_DELAY_IN_MS);
		list.removeHead();
		setIsDelFromHead(false);
		setVisualArr(list.toArray());
	}

	const delFromTail = async () => {
		setIsDelFromTail(true);
		setIsAllLoading(true);

		const arr = list.toArray();
		setVisualArr(arr);
		setTempElementValue(arr[arr.length - 1].value);
		arr[arr.length - 1].value = '';

		setVisualArr(arr);
		list.removeTail();
		await delay(SHORT_DELAY_IN_MS);

		setIsDelFromTail(false);
		setVisualArr(list.toArray());
	}

	const addByIndex = async () => {
		setIsAddByIndex(true);
		setIsAllLoading(true);

		clearInput('element-input');
		clearInput('index-input');

		const addingArr = list.toArray();

		for (let i = 0; i <= Number(indexInputValue); i++) {
			setNewIndex(i);
			await delay(DELAY_IN_MS);
			if (i < Number(indexInputValue)) {
				addingArr[i].state = ElementStates.Changing;
				setVisualArr(addingArr);
			}
		}

		setIsAddByIndex(false);
		list.insertByIndex(elementInputValue, Number(indexInputValue));

		const resultArr = list.toArray();
		resultArr[Number(indexInputValue)].state = ElementStates.Modified;
		setVisualArr(resultArr);

		await delay(DELAY_IN_MS);
		resultArr[Number(indexInputValue)].state = ElementStates.Default;
		setVisualArr(resultArr);
	}

	const delByIndex = async () => {
		setIsAllLoading(true);
		clearInput('index-input');

		const deleteArr = list.toArray();

		for (let i = 0; i < Number(indexInputValue); i++) {
			await delay(SHORT_DELAY_IN_MS);
			deleteArr[i].state = ElementStates.Changing;
			setVisualArr([...deleteArr]);
		}

		await delay(SHORT_DELAY_IN_MS);
		setTempElementValue(deleteArr[Number(indexInputValue)].value);
		deleteArr[Number(indexInputValue)].value = '';

		setIsDelByIndex(true);
		deleteArr[Number(indexInputValue)].state = ElementStates.Default;
		setNewIndex(Number(indexInputValue));

		await delay(DELAY_IN_MS);
		list.removeByIndex(Number(indexInputValue));
		setVisualArr(list.toArray());
		setIsDelByIndex(false);
	}

	useEffect(() => {
		const index = Number(indexInputValue)
		index < 0 || index >= list.getSize() ? setIsInvalidIndex(true) : setIsInvalidIndex(false);
	}, [indexInputValue]);

	return (
		<SolutionLayout title='Связный список'>
			<section className={styles.container}>
				<div className={styles.controlsContainer}>
					<Input
						placeholder='Введите значение'
						maxLength={4}
						isLimitText={true}
						extraClass={styles.input}
						onChange={handleAddElementInputChange}
						id='element-input'
						disabled={isAllLoading}
					/>
					<Button
						text='Добавить в head'
						type='button'
						onClick={() =>
							addToHead()
								.then(() => {
									setElementInputValue('');
									setIsAllLoading(false);
								})}
						disabled={list.getSize() >= 7 || isAllLoading || !elementInputValue}
						isLoader={isAddToHead}
						extraClass={styles.btnSmall}
					>
					</Button>
					<Button
						text='Добавить в tail'
						type='button'
						onClick={() =>
							addToTail()
								.then(() => {
									setElementInputValue('');
									setIsAllLoading(false)
								})}
						disabled={list.getSize() >= 7 || isAllLoading || !elementInputValue}
						isLoader={isAddToTail}
						extraClass={styles.btnSmall}
					>
					</Button>
					<Button
						text='Удалить из head'
						type='button'
						onClick={() =>
							delFromHead()
								.then(() => setIsAllLoading(false))}
						isLoader={isDelFromHead}
						disabled={list.getSize() === 0 || isAllLoading}
						extraClass={styles.btnSmall}
					>
					</Button>
					<Button
						text='Удалить из tail'
						type='button'
						onClick={() =>
							delFromTail()
								.then(() => setIsAllLoading(false))}
						isLoader={isDelFromTail}
						disabled={list.getSize() === 0 || isAllLoading}
						extraClass={styles.btnSmall}
					>
					</Button>
				</div>
				<div className={styles.controlsContainer}>
					<Input
						placeholder='Введите индекс'
						type='number'
						extraClass={styles.input}
						onChange={handlePointIndexInputChange}
						id='index-input'
						disabled={isAllLoading}
					/>
					<Button
						text='Добавить по индексу'
						extraClass={styles.btnBig}
						type='button'
						onClick={() =>
							addByIndex()
								.then(() => {
									setElementInputValue('');
									setIndexInputValue('');
									setIsAllLoading(false);
								})}
						isLoader={isAddByIndex}
						disabled={isAllLoading || isInvalidIndex || !(indexInputValue && elementInputValue)}
					>
					</Button>
					<Button
						text='Удалить по индексу'
						extraClass={styles.btnBig}
						type='button'
						onClick={() =>
							delByIndex()
								.then(() => {
									setIndexInputValue('');
									setIsAllLoading(false);
								})}
						isLoader={isDelByIndex}
						disabled={isAllLoading || isInvalidIndex || !indexInputValue}
					>
					</Button>
				</div>
			</section>
			<ul className={styles.circles}>
				{visualArr.map((element, index) => (
					<li key={index} className={styles.circleItem}>
						<Circle
							letter={element.value}
							extraClass={styles.circle}
							head={
								(isAllLoading && isAddToHead && index === 0) ||
								(isAllLoading && isAddToTail && index === visualArr.length - 1) ||
								(isAllLoading && isAddByIndex && index === newIndex)
									? (<Circle
										letter={elementInputValue}
										isSmall
										state={ElementStates.Changing}
									/>)
									: index === 0 ? HEAD : undefined}
							tail={
								(isAllLoading && isDelFromHead && index === 0) ||
								(isAllLoading && isDelFromTail && index === visualArr.length - 1) ||
								(isAllLoading && isDelByIndex && index === newIndex)
									? (<Circle
										letter={tempElementValue}
										isSmall
										state={ElementStates.Changing}
									/>)
									: index === visualArr.length - 1 ? TAIL : undefined}
							index={index}
							state={element.state}
						/>
						{index < visualArr.length - 1 &&
							<div className={styles.arrow}>
								<ArrowIcon/>
							</div>}
					</li>
				))}
			</ul>
		</SolutionLayout>
	);
};
