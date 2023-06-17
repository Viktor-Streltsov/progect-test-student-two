import React, {useState} from 'react'
import classes from "./addTest.module.css"
import {useDispatch} from "react-redux"
import {addTestApi} from "../../axios/testApi"

const regex = /^[1-4]$/

function AddTest() {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: "",
    })
    const handleChange = (e) => {
        const {name, value} = e.target

        if (name.includes('options')) {
            const optionIndex = name.split('[')[1].split(']')[0]
            const updatedOptions = [...formData.options]
            updatedOptions[optionIndex] = value

            setFormData((prevFormData) => ({
                ...prevFormData,
                options: updatedOptions,
            }))
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }))
        }
    }

    const isFormValid = () =>
        formData.question &&
        formData.options[0] &&
        formData.options[1] &&
        formData.options[2] &&
        formData.options[3] &&
        formData.correctAnswer

    const submitHandler = (e) => {
        e.preventDefault()
        if (!isFormValid()) {
            return alert('Введите все данные')
        }
        if (!regex.test(formData.correctAnswer)) {
            return alert('правильный ответ должен быть от 1 до 4')
        }
        dispatch(addTestApi(formData))
        setFormData({
            question: '',
            options: ['', '', '', ''],
            correctAnswer: "",
        })
    }



    return (
        <div className={classes.container_content}>
            <section className={classes.container_form_internships}>
                <div className={classes.head_form}>
                    <h2>
                        Добавление теста
                    </h2>
                </div>
                <form onSubmit={submitHandler}
                      className={classes.one_block}>
                    <label className={classes.label}>
                        Вопрос:
                        <input
                            type="text"
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                        />
                    </label>

                    {formData.options.map((option, index) => (
                        <label className={classes.label}>
                            тест № {index+1}:
                            <input
                                key={index}
                                type="text"
                                name={`options[${index}]`}
                                value={option}
                                onChange={handleChange}
                            />
                        </label>
                    ))}

                    <label className={classes.label}>
                        Правильный ответ №:
                        <input
                            type="number"
                            name="correctAnswer"
                            value={formData.correctAnswer}
                            onChange={handleChange}
                        />
                    </label>
                    <button type="submit">отправить тест</button>
                </form>
            </section>
        </div>
    )
}

export default AddTest