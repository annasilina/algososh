import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {randomArr} from "../../utils/randomArr";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {TItem} from "../../types/TItem";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [array, setArray] = useState<Array<TItem>>([]);
  const [sortingType, setSortingType] = useState<string>('selection');
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [ascending, setAscending] = useState<boolean>(false);
  const [descending, setDescending] = useState<boolean>(false);

  const generateNewArr = () => {
   setArray([...randomArr()]);
  }

  useEffect(() => {
    setArray([...randomArr()]);
  }, [])

  const changeSortingOption = (evt: ChangeEvent<HTMLInputElement>) => {
    setSortingType(evt.target.value);
  }

  const handleOnClick = (direction: Direction) => {
    setIsSorting(true);

    direction === Direction.Ascending
    && sortingType === 'selection'
    && selectionSorting(array, direction)
      .then(() => {
        setIsSorting(false);
        setAscending(false);
      });

    direction === Direction.Descending
    && sortingType === 'selection'
    && selectionSorting(array, direction)
      .then(() => {
        setIsSorting(false);
        setDescending(false);
      });

    direction === Direction.Ascending
    && sortingType === 'bubble'
    && bubbleSorting(array, direction)
      .then(() => {
        setIsSorting(false);
        setAscending(false);
      });

    direction === Direction.Descending
    && sortingType === 'bubble'
    && bubbleSorting(array, direction)
      .then(() => {
        setIsSorting(false);
        setDescending(false);
      });
  }

  const selectionSorting = async (array: Array<TItem>, direction: Direction) => {
    let tmp;
    let statement;

    for (let i = 0; i < array.length; i++) {
      let compareInd = i;
      for (let j = i + 1; j < array.length; j++) {
        array[compareInd].state = ElementStates.Changing;
        array[j].state = ElementStates.Changing;
        setArray([...array]);

        direction === Direction.Ascending
          ? statement = (array[compareInd].value > array[j].value)
          : statement = (array[compareInd].value < array[j].value)

        await delay(SHORT_DELAY_IN_MS);

        if (statement) {
          tmp = array[compareInd].value;
          array[compareInd].value = array[j].value;
          array[j].value = tmp;
        }
        array[j].state = ElementStates.Default;
      }
      array[i].state = ElementStates.Modified;
    }
  }

  const bubbleSorting = async (array: Array<TItem>, direction: Direction) => {
    let tmp;
    let statement;

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        setArray([...array]);

        direction === Direction.Ascending
          ? statement = (array[j].value > array[j + 1].value)
          : statement = (array[j].value < array[j + 1].value)

        await delay(SHORT_DELAY_IN_MS);

        if (statement) {
          tmp = array[j + 1].value;
          array[j + 1].value = array[j].value;
          array[j].value = tmp;
        }
        array[j].state = ElementStates.Default;
      }
      array[array.length - i - 1].state = ElementStates.Modified;
    }
  }

  return (
    <SolutionLayout title="Сортировка массива">
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
            <li key={index}>
              <Column
                index={item.value}
                state={item.state}
              >
              </Column>
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
