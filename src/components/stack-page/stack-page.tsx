import React, {ChangeEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import styles from "./stack.module.css";
import {Circle} from "../ui/circle/circle";
import {TOP} from "../../constants/element-captions";
import {Stack} from "./Stack";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../utils/delay";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

type TStackItem = {
  value: string,
  state: ElementStates
}

export const StackPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('')
  const [stackArray, setStackArray] = useState<TStackItem[]>([]);
  const [stack] = useState(new Stack<TStackItem>());

  const clearInput = () => {
    setInputValue('');
    const getInput = document.getElementById('input') as HTMLInputElement;
    getInput.value = '';
  }

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(evt.target.value);
  }

  const handleAddButton = async () => {
    setIsLoading(true);
    stack.push({value: inputValue, state: ElementStates.Changing});
    setStackArray([...stack.getElements()]);
    clearInput();
    await delay(SHORT_DELAY_IN_MS);
    if (stack.peak) {
      stack.peak.state = ElementStates.Default;
    }
    setStackArray([...stack.getElements()]);
  }

  const handleDeleteButton = async () => {
    if (stack.peak) {
      stack.peak.state = ElementStates.Changing;
    }
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);
    stack.pop();
    setStackArray([...stack.getElements()]);
  }

  const handleClearButton = () => {
    stack.clear();
    setStackArray([...stack.getElements()]);
  }

  return (
    <SolutionLayout title="Стек">
      <section className={styles.container}>
        <div className={styles.inputContainer}>
          <Input
            placeholder='Введите символы'
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
            disabled={!inputValue}
            isLoader={isLoading}
            type='button'
            onClick={() => handleAddButton().then(() => setIsLoading(false))}
          ></Button>
          <Button
            text='Удалить'
            extraClass={styles.btn}
            disabled={!stackArray.length}
            isLoader={isLoading}
            type='button'
            onClick={() => handleDeleteButton().then(() => setIsLoading(false))}
          ></Button>
        </div>
        <Button
          text='Очистить'
          extraClass={styles.btn}
          disabled={!stackArray.length}
          isLoader={isLoading}
          type='button'
          onClick={handleClearButton}
        ></Button>
      </section>
      <ul className={styles.circles}>
        {stackArray && stackArray.map((element, index) => (
          <li key={index}>
            <Circle
            letter={element.value}
            head={index === stackArray.length - 1 ? TOP : undefined}
            index={index}
            state={element.state}
          />
          </li>
        ))}
      </ul>
    </SolutionLayout>
  );
};
