import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import StarRating from 'react-star-ratings';


const RatingModal = ({children, ...props}) => {
  const { userObj } = useSelector((state) => state.user);

  // const  easeOfOrdering = "easeOfOrdering";
  // const  qualityOfFood = "qualityOfFood";
  // const  deliveryEffectiveness = "deliveryEffectiveness";


  // const handleModal = () => {
  //   props.setModalVisible(true);
  // };

    // const changeRating = ( newRating, name ) => {
    //     console.log(newRating);
    //     props.setrating(newRating);
    //     props.handlerating(newRating)

    // }
  return (
    <>
      {/* <div onClick={handleModal}>
        <i className="fa-solid fa-star text-danger"></i> <br />{" "}
        {userObj ? "Leave rating" : "Login to leave rating"}
      </div> */}
      <Modal centered {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Rate</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <StarRating
                        rating={props.star}
                        starRatedColor="red"
                        changeRating={(NewRating, name) => props.onStarClick(NewRating, name)}
                        numberOfStars={5}
                        name={props.name}
                    />
                  {children}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>submit</Button>
            </Modal.Footer>
      </Modal>
    </>
  );
};

export default RatingModal;
