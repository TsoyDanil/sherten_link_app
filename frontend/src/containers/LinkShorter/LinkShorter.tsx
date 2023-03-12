import { ChangeEvent, FunctionComponent, ReactElement, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Preloader from "../../components/UI/Prealoder/Preloader";
import { addLink } from "../../store/links/links.slice";
import { AppState, useAppDispatch } from "../../store/store";
import styles from './LinkShorter.module.css'

const LinkShorter: FunctionComponent = (): ReactElement => {

    const dispatch = useAppDispatch()

    const {linksLoading, requestStatus, shortenLink} = useSelector((state: AppState) => state.links, shallowEqual)

    const [link, setLink] = useState<string>('')

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value)
    }

    const checkButton= () => {
        link.trim() !== "" ? setButtonDisabled(false) : setButtonDisabled(true)
    }

    useEffect(()=>{
        checkButton()
    },[link])

    const shortenLinkHandler = () => {
        dispatch(addLink({originalUrl: link}))
    }

    return(
        <div className={styles.LinkShorter}>
            {linksLoading ? <Preloader/> : null}
            <h1 className={styles.LinkShorter_header}>Shorten your link!</h1>
            <p className={styles.LinkShorter_text}>Simplify your link!</p>
            <div className={styles.Interaction_block}>
                <input className={styles.Interaction_input} onChange={inputHandler} value={link} placeholder={'Inset link!'}/>
                <button className={styles.Interaction_button} disabled={buttonDisabled} onClick={shortenLinkHandler}>Shorten!</button>
            </div>
            <p className={styles.LinkShorter_text}>Your link will be here:</p>
            {
                shortenLink ? <a className={styles.LinkShorter_link} href={`http://localhost:8000/${shortenLink}`}>{`http://localhost:8000/${shortenLink}`}</a> : null
            }
        </div>
    )
}

export default LinkShorter