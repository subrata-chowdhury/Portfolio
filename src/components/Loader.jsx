import "../style/Loader.css"

export default function Loader() {
    return (
        <div className="loader-container">
            <div className="outer-loader"></div>
            <div className="inner-loader"></div>
            <p>Fetching Latest Details From GitHub</p>
        </div>
    )
}