exports.applyToRoom = async (req, res) => {
    let user = await User.findOne({
        _id:req.body.id
    });
    let room = await Room.findOne({
        _id:req.body.roomId
    });
    if(user.roomId == null){
        if(room.usersId.length < 4 ){
            if(!room.usersId.includes(user._id)){
                await room.update({
                    $push:{
                        usersId: user._id
                    }
                });
                await user.update({
                    roomId:room._id
                });
                return res.status(200)
                    .json({
                        ok:true,
                        error:false,
                        success:true,
                        data:room,
                    });
            }
                return res.status(400)
                    .json({
                        ok:false,
                        error:'User already registered under this room',
                        success:false,
                    });

        }
            return res.status(400)
                .json({
                    ok:false,
                    error:"Room is full",
                    success:false
                });
    }
        return res.status(400)
            .json({
                ok:false,
                error:"Student already registered in a room",
                success:false
            });
    

};