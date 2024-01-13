import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { apiClient } from "../apis/apiClient";
import { Button, Grid } from "@mui/material";
import { format } from "date-fns";

const Container = styled(Grid)`
  width: 65vw;
  height: 100%;
  display: flex;
  z-index: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  overflow-y: auto;

  @font-face {
    font-family: "AppleBold";
    src: url("https://cdn.jsdelivr.net/gh/cho1n/Apollo-Frontend@latest/src/assets/fonts/AppleSDGothicNeoB.ttf")
      format("truetype");
  }

  font-family: "AppleBold";
`;

const TitleBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  border-bottom: 2px solid #a1a0a0;
`;

const SubTitleBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: left;
  padding-bottom: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ElseBlock = styled.div`
  width: 17%;
  font-size: 1rem;
  font-weight: bold;
  color: #000000;
  padding-left: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #525252;
  padding-left: 1rem;
  padding-bottom: 1rem;
`;

const SubTitle = styled.div`
  width: 50%;
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  padding-left: 2rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ContentBlock = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: left;
  font-size: 1.4rem;
  padding: 20px;
  border-bottom: 2px solid #a1a0a0;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const CommentBlock = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  border: 1px solid #a1a0a0;
  border-radius: 10px;
  margin-top: 1rem;
`;

const Comment = styled.textarea`
  width: 100%;
  height: 80%;
  border: none;
  font-size: 1.2rem;
  padding: 10px;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const CommentButtonBlock = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const CommentContainer = styled.div`
  width: 100%;
  align-items: left;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const CommentListBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 10px;
  border: 1px solid #a1a0a0;
  border-radius: 10px;
  margin-top: 1rem;
`;

const CommentBlockHeader = styled.div`
  margin-left: auto;
  width: 100%;
  padding: 0px 10px 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: left;
  border-bottom: 1px solid #a1a0a0;
`;

const CommentBlockBody = styled.div`
  width: 100%;
  display: flex;
  align-items: left;
  padding: 10px 0 10px 10px;
  color: #a1a0a0;
  font-size: 1rem;
`;

const CommentBlockTitle = styled.div`
  width: 50%;
  font-size: 1.1rem;
`;

const CommentBlockTime = styled.div`
  width: 50%;
  font-size: 0.8rem;
  color: #a1a0a0;
  text-align: right;
`;

export const PostDetail = () => {
  const { postId } = useParams<{ postId?: string }>();
  const [loading, setLoading] = useState(true);
  const [board, setBoard] = useState<Board | null>(null);
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  interface Board {
    postId: number;
    title: string;
    writer: string;
    tag: string;
    content: string;
    createdAt: string;
    viewCnt: number;
    comments: [
      {
        commentId: number;
        writer: string;
        content: string;
        createdAt: string;
      }
    ];
  }

  const postComment = async () => {
    try {
      await apiClient
        .post(`/api/v2/users/community/comment`, {
          postId: board?.postId,
          content: comment,
        })
        .then((res) => {
          alert("댓글이 등록되었습니다.");
          window.location.reload();
        });
    } catch (error) {
      console.log(error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const numericPostId = postId ? parseInt(postId, 10) : 0; // useParams로 받은 postId는 string이므로, number로 변환.
    apiClient
      .get(`/api/v2/users/community/post/?id=${numericPostId}`)
      .then((response) => {
        setBoard(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      apiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`;
    }
  }, [postId]);

  return (
    <Container>
      {/* {loading ? (
        <div>
          <img src={spinner} alt="loading" />
        </div>
      ) : ( */}
      <TitleBlock>
        <Title>Community</Title>
        <SubTitleBlock>
          <ElseBlock>
            {"["} {board?.tag} {"]"}
          </ElseBlock>
          <SubTitle> {board?.title} </SubTitle>
          <ElseBlock
            style={{
              color: "gray",
            }}
          >
            👤 {board?.writer}
          </ElseBlock>
          <ElseBlock>👀 {board?.viewCnt}</ElseBlock>
          <ElseBlock
            style={{ color: "gray", fontSize: "14px", paddingRight: "10px" }}
          >
            {" "}
            {board?.createdAt
              ? format(new Date(board.createdAt), "yyyy-MM-dd HH:mm")
              : "날짜 정보 없음"}
          </ElseBlock>
        </SubTitleBlock>
      </TitleBlock>
      <ContentBlock>
        <p>{board?.content}</p>
      </ContentBlock>
      <CommentBlock>
        <Comment
          placeholder="내용을 입력하세요."
          onChange={handleCommentChange}
        ></Comment>
        <CommentButtonBlock>
          <Button
            sx={{
              backgroundColor: "#52C07E",
              color: "#FFFFFF",
              height: "1.5rem",
              fontSize: "1rem",
              borderRadius: "10px",
            }}
            onClick={postComment}
          >
            작성
          </Button>
        </CommentButtonBlock>
      </CommentBlock>
      <CommentContainer>
        {board?.comments.map((comment) => (
          <CommentListBlock key={comment.commentId}>
            <CommentBlockHeader>
              <CommentBlockTitle>{comment?.writer}</CommentBlockTitle>
              <CommentBlockTime>
                {format(new Date(comment?.createdAt), "yyyy-MM-dd HH:mm")}
              </CommentBlockTime>
            </CommentBlockHeader>
            <CommentBlockBody>{comment?.content}</CommentBlockBody>
          </CommentListBlock>
        ))}
      </CommentContainer>
      {/* )} */}
    </Container>
  );
};
