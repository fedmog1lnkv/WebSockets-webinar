using System.Net.WebSockets;
using System.Text;
using Microsoft.AspNetCore.Mvc;

public class WebSocketController : Controller
{
    private static readonly List<WebSocket> _sockets = new List<WebSocket>();
    private static readonly List<string> _messages = new List<string>();

    [Route("/ws")]
    public async Task Get()
    {
        if (HttpContext.WebSockets.IsWebSocketRequest)
        {
            using var webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
            _sockets.Add(webSocket);
            await SendMessages(webSocket);
            await Echo(webSocket);
        }
        else
        {
            HttpContext.Response.StatusCode = StatusCodes.Status400BadRequest;
        }
    }

    private static async Task Echo(WebSocket webSocket)
    {
        var buffer = new byte[1024 * 4];
        var receiveResult = await webSocket.ReceiveAsync(
            new ArraySegment<byte>(buffer), CancellationToken.None);

        while (!receiveResult.CloseStatus.HasValue)
        {
            var messageBytes = new ArraySegment<byte>(buffer, 0, receiveResult.Count).ToArray();
            var message = Encoding.UTF8.GetString(messageBytes);
            _messages.Add(message);
            foreach (var socket in _sockets)
            {
                if (socket.State == WebSocketState.Open)
                {
                    await socket.SendAsync(new ArraySegment<byte>(messageBytes, 0, receiveResult.Count),
                        receiveResult.MessageType, receiveResult.EndOfMessage, CancellationToken.None);
                }
            }

            receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment<byte>(buffer), CancellationToken.None);
        }

        await webSocket.CloseAsync(
            receiveResult.CloseStatus.Value,
            receiveResult.CloseStatusDescription,
            CancellationToken.None);
        _sockets.Remove(webSocket);
    }

    private static async Task SendMessages(WebSocket webSocket)
    {
        foreach (var message in _messages)
        {
            var messageBytes = Encoding.UTF8.GetBytes(message);
            await webSocket.SendAsync(new ArraySegment<byte>(messageBytes), WebSocketMessageType.Text, true,
                CancellationToken.None);
        }
    }
    
    public static async Task ClearChat()
    {
        _messages.Clear();
        var clearMessage = Encoding.UTF8.GetBytes("@$/clear");
        foreach (var socket in _sockets)
        {
            if (socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(new ArraySegment<byte>(clearMessage, 0, clearMessage.Length),
                    WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
