import React, { useState, FormEvent, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../apis/apiClient";

const ContainerWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: #ffffff;
  z-index: 2;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
//eeffed
const FormWrapper = styled.form`
  width: 700px;
  height: 600px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const Text = styled.div`
  font-size: 40px;
  font-weight: bold;
`;

const SubText = styled.div`
  font-size: 22px;
  padding: 10px 10px 10px 10px;
`;

const Box = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 20px 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border: 1px solid #545454;
  border-radius: 12px;
  padding-left: 10px;
  font-size: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
`;

const AlertText = styled.div`
  font-size: 15px;
  color: red;
  margin-top: 10px;
`;

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVerificationCode(e.target.value);
  };

  const handleIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordCheckChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(e.target.value);
  };

  const isSame = password === passwordCheck;

  const handleSendVerificationCode = async () => {
    try {
      await apiClient.get(`/api/mail/send/code`, {
        params: {
          email: email,
        },
      });
      setIsCodeSent(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const requiredFields = ["name", "email"];
    for (const field of requiredFields) {
      const fieldValue = data.get(field) as string;
      if (fieldValue === null || !fieldValue.trim()) {
        if (field === "name")
          alert(`이름 칸이 누락되어 있습니다. 다시 입력해주세요.`);
        else if (field === "email")
          alert(`이메일 칸이 누락되어 있습니다. 다시 입력해주세요.`);
        return;
      }
    }

    const passwordValue = password.trim();
    if (!passwordValue) {
      alert("비밀번호 칸이 누락되어 있습니다. 다시 입력해주세요.");
      return;
    }

    if (!isCodeSent || verificationCode.trim() === "") {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await apiClient.post(`/api/register`, {
        id: data.get("id"),
        korName: data.get("name"),
        email: email,
        password: password,
      });
      console.log(response);
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleVerifyCode = async () => {
    try {
      await apiClient.post(`/api/mail/verify/code`, {
        email: email,
        code: verificationCode,
      });
      alert("인증이 완료되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      console.log(error);
      alert("인증번호가 유효하지 않습니다. 다시 확인해주세요.");
    }
  };

  return (
    <ContainerWrapper>
      <FormWrapper onSubmit={handleSubmit}>
        <Text> 회원가입 </Text>
        <Box>
          <SubText> 이름 </SubText>
          <Input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력해주세요."
            value={name}
            required
            onChange={handleNameChange}
          />
          <SubText> 아이디 </SubText>
          <Input
            type="text"
            name="id"
            value={id}
            required
            placeholder="사용하실 아이디를 입력해주세요."
            onChange={handleIdChange}
          />
          <SubText> 이메일 </SubText>
          <Input
            type="text"
            id="email"
            name="email"
            value={email}
            required
            placeholder="사용자 인증을 위해 이메일을 입력해주세요."
            onChange={handleEmailChange}
          />
          {isCodeSent && (
            <>
              <Button
                sx={{
                  marginTop: "10px",
                  width: "20%",
                  background: "#52C07E",
                  color: "#ffffff",
                  fontSize: "17px",
                  left: "530px",
                  borderRadius: "12px",
                }}
                onClick={handleVerifyCode}
                style={{ marginTop: "10px" }}
              >
                인증번호 확인
              </Button>
            </>
          )}
          {!isCodeSent && (
            <Button
              sx={{
                marginTop: "10px",
                width: "20%",
                background: "#52C07E",
                color: "#ffffff",
                fontSize: "17px",
                left: "530px",
                borderRadius: "12px",
              }}
              onClick={handleSendVerificationCode}
            >
              인증번호 전송
            </Button>
          )}
          <SubText style={{ opacity: isCodeSent ? 1 : 0 }}> 인증번호 </SubText>
          <Input
            type="text"
            name="verificationCode"
            id="verificationCode"
            placeholder="인증번호를 입력해주세요."
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            style={{ opacity: isCodeSent ? 1 : 0 }}
          />{" "}
          <SubText> 비밀번호 </SubText>
          <Input
            type="password"
            name="password"
            value={password}
            placeholder="사용하실 비밀번호를 입력해주세요."
            required
            onChange={handlePasswordChange}
          />
          <SubText> 비밀번호 확인 </SubText>
          <Input
            type="password"
            name="passwordCheck"
            value={passwordCheck}
            placeholder="입력하신 비밀번호를 확인해주세요."
            required
            onChange={handlePasswordCheckChange}
          />
          {passwordCheck !== "" && !isSame && (
            <AlertText className="passwordCheck">비밀번호가 다릅니다.</AlertText>
          )}
        </Box>
        <Button
          type="submit"
          sx={{
            width: "20%",
            background: "#52C07E",
            color: "#ffffff",
            fontSize: "20px",
            borderRadius: "12px",
          }}
        >
          회원가입
        </Button>
      </FormWrapper>
    </ContainerWrapper>
  );
};
