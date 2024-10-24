
import React, { useEffect, useState } from 'react'
import { MarkListProps } from './MarkList.interface'
import './MarkList.css'
import { AddIcon } from './AddIcon'
import { RemoveIcon } from './RemoveIcon'
const INITIAL_VALUE = { value: 0 }
export const MarkList: React.FC<MarkListProps> = (props) => {
    let timeout: number | undefined = undefined;
    const [markList, setMarkList] = useState([INITIAL_VALUE]);
    const handleAdd = () => {
        setMarkList((prev) => [...prev, INITIAL_VALUE]);
    };
    const handleRemove = (index: number) => {
        setMarkList((prev) => prev.filter((_, key) => key !== index));
    };
    useEffect(() => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            props.handleDataChange(markList.map((item) => Number(item.value)));
        }, 900);
        return () => {
            clearTimeout(timeout);
        };
    }, [markList]);
    const handleChange = (value: number, index: number) => {
        setMarkList((prev) =>
            prev.map((item, key) => (key === index ? { value } : item))
        );
    };
    return (
        <div className="markListWrapper">
            <h3>{props.title}</h3>
            <div className="markListItems">
                {markList.map((item, index) => {
                    const isInvalidValue = !(props.maxMark >= item.value)
                    return (
                        <div className="markListItem">
                            <label>
                                {props.title} {index + 1}
                            </label>
                            <div className="markListItemInput">
                                <div className={'markListItemInputWrapper'}>
                                    <input
                                        className={isInvalidValue ? 'errorInput' : ''}
                                        type="number"
                                        value={item.value}
                                        onChange={(event) =>
                                            handleChange(event.target.value as any, index)
                                        }
                                    />
                                    {
                                        isInvalidValue &&
                                        <span className='invalidInputMessage'>Mark should be in {props.maxMark}</span>
                                    }
                                </div>
                                {markList.length > 1 ? (
                                    <span
                                        onClick={() => handleRemove(index)}
                                        className="removeIcon"
                                    >
                                        <RemoveIcon />
                                    </span>
                                ) : null}
                                {index + 1 === markList.length ? (
                                    <span onClick={handleAdd} className="addIcon">
                                        <AddIcon />
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};