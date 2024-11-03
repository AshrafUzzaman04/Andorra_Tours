const TypingIndicator = () => {
    return (
        <>
            <svg height="20" width="40" class="loader">
                <circle class="dot" cx="8" cy="8" r="3" style={{fill:"grey"}} />
                <circle class="dot" cx="18" cy="8" r="3" style={{fill:"grey"}} />
                <circle class="dot" cx="28" cy="8" r="3" style={{fill:"grey"}} />
            </svg>
        </>
    )
}

export default TypingIndicator