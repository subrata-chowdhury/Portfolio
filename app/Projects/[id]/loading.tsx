import "@/app/styles/Loader.css"

export default function Loading() {
    return (
        <div className="loader-container">
            <div className="outer-loader"></div>
            <div className="inner-loader"></div>
            <p>Fetching Latest Details From GitHub</p>
        </div>
    )
}