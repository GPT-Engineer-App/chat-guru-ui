import React, { useState } from "react";
import { Container, VStack, HStack, Text, Input, Button, Box, IconButton, useColorMode, useColorModeValue, Select } from "@chakra-ui/react";
import { FaSun, FaMoon, FaPaperPlane } from "react-icons/fa";

const Index = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "gray.900");
  const textColor = useColorModeValue("black", "white");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("default");
  const [mode, setMode] = useState("chat");
  const [model, setModel] = useState("gpt-3");

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, { text: "This is a simulated response.", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg={bgColor} color={textColor}>
      <VStack spacing={4} width="100%">
        <HStack width="100%" justifyContent="space-between">
          <Text fontSize="2xl">ChatGPT-like Bot</Text>
          <IconButton aria-label="Toggle Dark Mode" icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} />
        </HStack>
        <HStack width="100%" spacing={4}>
          <Select value={prompt} onChange={(e) => setPrompt(e.target.value)}>
            <option value="default">Default Prompt</option>
            <option value="prompt1">Prompt 1</option>
            <option value="prompt2">Prompt 2</option>
          </Select>
          <Select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option value="chat">Chat Mode</option>
            <option value="qa">Q&A Mode</option>
            <option value="story">Story Mode</option>
          </Select>
          <Select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="gpt-3">GPT-3</option>
            <option value="gpt-4">GPT-4</option>
          </Select>
        </HStack>
        <Box width="100%" height="60vh" overflowY="auto" bg={useColorModeValue("white", "gray.800")} p={4} borderRadius="md" boxShadow="md">
          {messages.map((msg, index) => (
            <Box key={index} alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"} bg={msg.sender === "user" ? "blue.500" : "green.500"} color="white" p={2} borderRadius="md" mb={2}>
              {msg.text}
            </Box>
          ))}
        </Box>
        <HStack width="100%">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
          <IconButton aria-label="Send Message" icon={<FaPaperPlane />} onClick={handleSend} />
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;
