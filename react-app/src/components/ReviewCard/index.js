import profile from '../../assets/profile.png'
import '../../zCSS/reviewcard.css'
import { thunkOneBeer } from '../../store/beer'
import { thunkOneBrewery } from '../../store/brewery'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import beerStar from '../../assets/beer-star.png'
import OpenModalButton from '../OpenModalButton'
import ReviewEditModal from '../ReviewEditModal'


export default function ReviewCard({ username, review, beer, location }) {
    const history = useHistory()
    const dispatch = useDispatch()
    if (!beer) {
        let beer = review.beer
    }
    const user = useSelector(state => state.session?.user)
    let beerId = beer?.id
    let beerLogo = beer?.beer_logo
    let beerName = beer?.name
    let reviewText = review?.review_text
    let reviewImage = review?.image
    let beerRating = review?.rating
    let divclass

    if (location) { divclass = "beer-reviews" }
    else { divclass = "review-main-container" }

    let button2 = (<div className="review-navigate-beer-container">
        {/* <div className="review-navigate-text">
                            Navigate to edit/delete review!
                        </div> */}
        <button
            className="review-navigate-button"
            onClick={() => navigateToBeer(beerId)}
        ><span>Navigate to Edit/Delete</span>
        </button>
    </div>)
    if (location) { button2 = null }

    if (!reviewImage) {
        reviewImage = 'https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found-300x169.jpg'
    }

    const displayStars = (num) => {
        let result
        if(num == 1) result = <div><img src={beerStar}></img></div>
        if(num == 2) result =
        (<div>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
        </div>)
        if(num == 3) result =
        (<div>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
        </div>)
        if(num == 4) result =
        (<div>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
        </div>)
        if(num == 5) result =
        (<div>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
            <img src={beerStar}></img>
        </div>)
        return result
    }

    const navigateToBeer = (beerId) => {
        dispatch(thunkOneBeer(beerId))
            .then(async () => await history.push(`/beer/${beerId}`))
            .then(() => window.location.replace(`/beer/${beerId}#reviewid${review.id}`))
    }

    const navigateToBrew = (brewId) => {
        dispatch(thunkOneBrewery(brewId))
            .then(async () => await history.push(`/brewery/${brewId}`))
    }

    if (!location) {
        return (
            <div id={`reviewid${review?.id}`} className={divclass}>
                <div className="review-left-container">
                    <div className="review-user-container">
                        <div className="review-profile-icon">
                            <img className="review-user-icon" src={profile} />
                        </div>
                        <div className="review-user-info">
                            {username}
                        </div >
                        {!location && (user?.id === review?.user_id) ?
                            (<div className='button'>
                                <OpenModalButton
                                    buttonText="Edit/Delete"
                                    // onItemClick={closeMenu}
                                    modalComponent={<ReviewEditModal
                                        rev={review} />}
                                />
                            </div>
                            )
                            : button2}
                    </div>
                    {location ? null : <div className="review-beer-container">
                        <div className="review-sub-beer-container">
                            <img className="review-beer-logo" src={beerLogo} />
                            <div className="review-beer-name">{beerName}</div>
                            <div className="review-rating-container">
                                Rating: {beerRating}
                            </div>
                        </div>
                    </div>}
                    <div className="review-text-container">
                        <div>Review: {reviewText}</div>
                        {location ? (<div>Rating: {review.rating}</div>) : null}
                    </div>
                </div>
                <div className="review-right-container-img">
                    <img className="review-images" src={reviewImage} />
                </div>
            </div>
        )
    }
    return (
        <div id={`reviewid${review?.id}`} className={divclass}>
            <div className="review-left-container">
                <div className="review-user-container">
                    <div className="review-profile-icon">
                        <img className="review-user-icon" src={profile} />
                    </div>
                    <div className="review-info">
                        {username} is drinking a<span className='link' onClick={() => {navigateToBeer(beer.id)}}>{beer?.name}</span> by <span className='link' onClick={() => {navigateToBrew(beer.brewery.id)}}>{beer.brewery.name}</span>
                    </div >
                    {!location && (user?.id === review?.user_id) ?
                        (<div className='button'>
                            <OpenModalButton
                                buttonText="Edit/Delete"
                                // onItemClick={closeMenu}
                                modalComponent={<ReviewEditModal
                                    rev={review} />}
                            />
                        </div>
                        )
                        : button2}
                </div>
                {location ? null : <div className="review-beer-container">
                    <div className="review-sub-beer-container">
                        <img className="review-beer-logo" src={beerLogo} />
                        <div className="review-beer-name">{beerName}</div>
                        <div className="review-rating-container">
                            Rating: {displayStars(beerRating)}
                        </div>
                    </div>
                </div>}
                <div className="review-text-container">
                    <div>{reviewText}</div>
                    {location ? (<div>{displayStars(beerRating)}</div>) : null}
                </div>
            </div>
            <div className="review-right-container-img">
                <img className="review-images" src={reviewImage} />
            </div>
        </div>
    )
}
