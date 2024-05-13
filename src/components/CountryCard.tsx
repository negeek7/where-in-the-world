import styles from '../../styles/countrycard.module.css'

interface propsInfo {
    country: Object
}

function CountryCard({country}: propsInfo) {
    return (
        <div className={`${styles.container}`}>
            <div className={styles.imagecontainer}>
                <img src="https://flagcdn.com/in.svg" />
            </div>
            <div className={styles.bottomcontainer}>
                <p className="font-semibold text-xl mt-2 mb-4">India</p>
                <div className="flex flex-col gap-2">
                    <div>
                        <span className="font-semibold">Population:</span> <span>27,657,125</span>
                    </div>
                    <div>
                        <span className="font-semibold">Region:</span> <span>Asia</span>
                    </div>
                    <div>
                        <span className="font-semibold">Capital:</span> <span>Delhi</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryCard