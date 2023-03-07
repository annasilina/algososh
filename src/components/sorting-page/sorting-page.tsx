import React, {useEffect, useMemo, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import styles from "./sorting.module.css";
import {RadioInput} from "../ui/radio-input/radio-input";
import {Button} from "../ui/button/button";
import {randomArr} from "../../utils/randomArr";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";

export const SortingPage: React.FC = () => {
  useEffect(() => {

  }, [])
  const initArray = useMemo(
    () => randomArr()
  , []);

  const [visualArray, setVisualArray] = useState<Array<number>>(initArray);

  const generateArr = () => {
    setVisualArray(randomArr());
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <section className={styles.section}>
        <div className={styles.controlsContainer}>
          <div className={styles.inputContainer}>
            <RadioInput
              label='Выбор'
              checked={true}
            />
            <RadioInput
              label='Пузырек'
              checked={false}
            />
          </div>
          <div className={styles.buttonContainer}>

            <Button
              type='button'
              text='По возрастанию'
              sorting={Direction.Ascending}
            >
            </Button>
            <Button
              type='button'
              text='По убыванию'
              sorting={Direction.Descending}
            >
            </Button>
          </div>
          <Button
            type='button'
            text='Новый массив'
            onClick={generateArr}
          >
          </Button>
        </div>
        <ul className={styles.columns}>
          {visualArray.map((item, index) => (
            <li key={index}>
              <Column
                index={item}
              >
              </Column>
            </li>
          ))}
        </ul>
      </section>
    </SolutionLayout>
  );
};
