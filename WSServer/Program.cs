var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

/* WEBSOCKETS */
var webSocketOptions = new WebSocketOptions()
{
    // KeepAliveInterval — как часто нужно отправлять клиенту кадры проверки связи,
    // чтобы прокси-серверы удерживали соединение открытым.
    // Значение по умолчанию — две минуты
    KeepAliveInterval = TimeSpan.FromSeconds(120)

    // AllowedOrigins — список допустимых значений заголовка Origin для запросов WebSocket.
    // По умолчанию разрешены все источники.
};

app.UseWebSockets(webSocketOptions);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();