import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {randomArr} from "../../utils/randomArr";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {selectionSorting} from "./selectionSorting";
import {bubbleSorting} from "./bubbleSorting";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortedIndex, setSortedIndex] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number[]>([]);
  const [sortingType, setSortingType] = useState<string>('selection');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [ascending, setAscending] = useState<boolean>(false);
  const [descending, setDescending] = useState<boolean>(false);

  const generateNewArr = () => {
    setSortedIndex([]);
    setCurrentIndex([]);
    setArray([...randomArr()]);
  }

  useEffect(() => {
    setSortedIndex([]);
    setCurrentIndex([]);
    setArray([...randomArr()]);
  }, [])

  const changeSortingOption = (evt: ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
    setSortingType(evt.target.value);
  }

  const handleOnClick = (direction: Direction) => {
    setSortedIndex([]);
    setCurrentIndex([]);
    setIsSorting(true);

    direction === Direction.Ascending
    && sortingType === 'selection'
    && selectionSorting(array, direction, setArray, setCurrentIndex, setSortedIndex, delay)
      .then(() => {
        setIsSorting(false);
        setAscending(false);
      });

    direction === Direction.Descending
    && sortingType === 'selection'
    && selectionSorting(array, direction, setArray, setCurrentIndex, setSortedIndex, delay)
      .then(() => {
        setIsSorting(false);
        setDescending(false);
      });

    direction === Direction.Ascending
    && sortingType === 'bubble'
    && bubbleSorting(array, direction, setArray, setCurrentIndex, setSortedIndex, delay)
      .then(() => {
        setIsSorting(false);
        setAscending(false);
      });

    direction === Direction.Descending
    && sortingType === 'bubble'
    && bubbleSorting(array, direction, setArray, setCurrentIndex, setSortedIndex, delay)
      .then(() => {
        setIsSorting(false);
        setDescending(false);
      });
  }

  return (
    <SolutionLayout title='Сортировка массива'>
      <section className={styles.section}>
        <div className={styles.controlsContainer}>
          <div className={styles.inputContainer}>
            <RadioInput
              label='Выбор'
              value='selection'
              checked={sortingType === 'selection'}
              onChange={changeSortingOption}
              disabled={isSorting}
            />
            <RadioInput
              label='Пузырек'
              value='bubble'
              checked={sortingType === 'bubble'}
              onChange={changeSortingOption}
              disabled={isSorting}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type='button'
              text='По возрастанию'
              extraClass={styles.button}
              sorting={Direction.Ascending}
              onClick={() => {
                handleOnClick(Direction.Ascending);
                setAscending(true);
              }}
              disabled={isSorting}
              isLoader={isSorting && ascending}
            >
            </Button>
            <Button
              type='button'
              text='По убыванию'
              extraClass={styles.button}
              sorting={Direction.Descending}
              onClick={() => {
                handleOnClick(Direction.Descending);
                setDescending(true);
              }}
              disabled={isSorting}
              isLoader={isSorting && descending}
            >
            </Button>
          </div>
          <Button
            type='button'
            text='Новый массив'
            extraClass={styles.button}
            onClick={generateNewArr}
            disabled={isSorting}
          >
          </Button>
        </div>
        <ul className={styles.columns}>
          {array.map((item, index) => (
            <li key={index} className={styles.column}>
              <Column
                index={item}
                state={
                  sortedIndex.includes(index)
                    ? ElementStates.Modified
                    : currentIndex.includes(index)
                      ? ElementStates.Changing
                      : ElementStates.Default
                }
              >
              </Column>
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
