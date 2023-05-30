using Microsoft.AspNetCore.Mvc;

namespace WSServer.Controllers;

[ApiController]
public class ChatManagement : ControllerBase
{
    [Route("/chat/clear")]
    [HttpDelete]
    public IActionResult ClearChat()
    {
        WebSocketController.ClearChat();
        return Ok("Chat clear");
    }
}