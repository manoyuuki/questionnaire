import { useForm, Controller }        from "react-hook-form";
import Container                      from "@material-ui/core/Container"
import Input                          from "@material-ui/core/Input"
import React, { useEffect, useState } from "react";
import firebase                       from "./config/firebase"

export default function Home() {
  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    if (q3Flag && q4Flag) {
      firebase.firestore()
      .collection('data')
      .add({
        name: data.name,
        birth: data.birth,
        isLearning: data.isLearning,
        wasLearning: data.wasLearning,
        LearningLanguage: data.LearningLanguage
      })
    } else {
      firebase.firestore()
      .collection('data')
      .add({
        name: data.name,
        birth: data.birth,
        isLearning: data.isLearning,
        wasLearning: data.wasLearning
      })
    }
  }

  const [q3Flag, setQ3Flag] = useState(false);
  const [q4Flag, setQ4Flag] = useState(false);
  
  const q5 = (language) => {
    return (
      <>
        {language.map((e) => (
          <React.Fragment key={e}>
            <input
              id={e}
              name="LearningLanguage"
              type="checkbox"
              value={e}
              {...register("LearningLanguage")}
              />
            <label htmlFor={e}>{e} </label>
          </React.Fragment>
        ))}
      </>
    )
  }

  const Q5 = () => {
    const language_1 = ["C", "Python", "Java", "C++", "C#"]
    const language_2 = ["Visual Basic", "JavaScript", "PHP", "Assembly language", "SQL"]
    const language_3 = ["Classic Visual Basic", "Groovy", "Ruby", "R", "Perl"]
    const language_4 = ["Swift", "Fortran", "Delphi", "MATLAB", "Go"]
    const languages = [language_1, language_2, language_3, language_4]
  
    return (
      <>
        {languages.map((language, i) => {
          return (
            <React.Fragment key = {i}>
              <br />
              {q5(language)}
            </React.Fragment>
          )
        })}
      </>
    )
  }

  const AddQuestion = () => {
    if (q3Flag && q4Flag) {
      return (
        <div>
          <span>Q5. 今まで学習したことのあるプログラミング言語をすべて教えてください。</span>
          <Q5 />
        </div>
      )
    } else {
      return (
        null
      )  
    }
  }

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>

        <form onSubmit={handleSubmit(onSubmit)} id = "form">
          <div>
            <label htmlFor = "name">Q1. 名前を入力してください(匿名可)。</label>
            <Controller 
              name         = "name"
              defaultValue = ""
              control      = {control}
              render       = {({field: {value, onChange}}) => <Input value = {value} onChange = {onChange} /> }
            />
          </div>
          <div>
            <label htmlFor = "birth">Q2. 生年月日を入力してください。(例： 19900101)</label>
            <Controller 
              name         = "birth"
              defaultValue = ""
              control      = {control}
              rules        = {{required: true, pattern: /^[0-9]{8}$/}}
              render       = {({field: {value, onChange}}) => <Input value = {value} onChange = {onChange} /> }
            />
            {
              errors.birth && errors.birth.type === "required" ?
              <span>※このフィールドは必須項目です</span>: null
            }
            {
              errors.birth && errors.birth.type === "pattern" ?
              <span>※整数8桁で入力してください</span>: null
            }
          </div>
          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              id    = "isLearning1"
              name  = "isLearning"
              type  = "radio"
              value = "true"
              onClick = {() => setQ3Flag(true)}
              {...register("isLearning", {required : true })}
            />
            <label htmlFor = "isLearning1">はい</label>

            <input
              id    = "isLearning2"
              name  = "isLearning"
              type  = "radio"
              value = "false"
              onClick = {() => setQ3Flag(false)}
              {...register("isLearning", { required: true })}
            />
            <label htmlFor = "isLearning2">いいえ</label>
            {
              errors.isLearning &&
              <span>※このフィールドは必須項目です</span>
            }
          </div>
          <div>
            <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
            <input
              id    = "wasLearning1"
              name  = "wasLearning"
              type  = "radio"
              value = "true"
              onClick = {() => setQ4Flag(true)}
              {...register("wasLearning", { required: true })}
            />
            <label htmlFor = "wasLearning1">はい</label>

            <input
              id    = "wasLearning2"
              name  = "wasLearning"
              type  = "radio"
              value = "false"
              onClick = {() => setQ4Flag(false)}
              {...register("wasLearning", { required: true })}
            />
            <label htmlFor = "wasLearning2">いいえ</label>
            {
              errors.wasLearning &&
              <span>※このフィールドは必須項目です</span>
            }
            <AddQuestion />
          </div>
          <input type="submit" value = "アンケートを提出する" />
        </form>
      </Container>
    </>
  )
}
