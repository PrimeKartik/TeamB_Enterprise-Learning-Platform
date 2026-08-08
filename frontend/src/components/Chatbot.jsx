import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { chatApi } from '../api/chatApi'


/* ─── tiny markdown-ish renderer ─── */
function renderMarkdown(text) {
  if (!text) return ''
  let html = text
    // code blocks
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="cb-code-block"><code>$2</code></pre>')
    // inline code
    .replace(/`([^`]+)`/g, '<code class="cb-inline-code">$1</code>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // unordered lists
    .replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>')
    // wrap consecutive <li> in <ul>
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="cb-list">$1</ul>')
    // line breaks
    .replace(/\n/g, '<br/>')
  return html
}


/* ─── styles ─── */
const styles = {
  /* === FAB (floating button) === */
  fab: {
    position: 'fixed',
    bottom: 28,
    right: 28,
    width: 60,
    height: 60,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 24px rgba(168,85,247,0.45), 0 0 60px rgba(168,85,247,0.15)',
    zIndex: 9999,
    transition: 'transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease',
  },
  fabHover: {
    transform: 'scale(1.1)',
    boxShadow: '0 6px 32px rgba(168,85,247,0.6), 0 0 80px rgba(168,85,247,0.25)',
  },
  fabPulse: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    opacity: 0.4,
    animation: 'cbPulse 2s ease-in-out infinite',
  },

  /* === Chat panel === */
  panel: (open) => ({
    position: 'fixed',
    bottom: 100,
    right: 28,
    width: 400,
    maxWidth: 'calc(100vw - 32px)',
    height: 560,
    maxHeight: 'calc(100vh - 140px)',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9998,
    background: 'rgba(23,11,38,0.92)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(168,85,247,0.2)',
    boxShadow: '0 16px 64px rgba(0,0,0,0.5), 0 0 48px rgba(168,85,247,0.1)',
    transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none',
    transition: 'transform 0.35s cubic-bezier(.34,1.56,.64,1), opacity 0.25s ease',
  }),

  /* === Header === */
  header: {
    padding: '16px 20px',
    background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 100%)',
    borderBottom: '1px solid rgba(168,85,247,0.15)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
  },
  headerIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.2,
  },
  headerSub: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: 400,
  },
  closeBtn: {
    marginLeft: 'auto',
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(255,255,255,0.08)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(255,255,255,0.6)',
    transition: 'background 0.2s, color 0.2s',
  },

  /* === Messages === */
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px 16px 8px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  welcomeMsg: {
    textAlign: 'center',
    padding: '28px 20px',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 13,
    lineHeight: 1.6,
  },
  welcomeIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    background: 'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.1) 100%)',
    border: '1px solid rgba(168,85,247,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },

  msgRow: (isUser) => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    alignItems: 'flex-end',
    gap: 8,
  }),
  msgAvatar: (isUser) => ({
    width: 28,
    height: 28,
    borderRadius: 8,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: isUser
      ? 'rgba(168,85,247,0.2)'
      : 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    order: isUser ? 1 : 0,
  }),
  msgBubble: (isUser) => ({
    maxWidth: '78%',
    padding: '10px 14px',
    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
    background: isUser
      ? 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
      : 'rgba(255,255,255,0.07)',
    color: '#fff',
    fontSize: 13.5,
    lineHeight: 1.6,
    wordBreak: 'break-word',
  }),

  /* === Typing indicator === */
  typing: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 0',
  },
  dot: (i) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: 'rgba(168,85,247,0.7)',
    animation: `cbBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
  }),

  /* === Input bar === */
  inputBar: {
    padding: '12px 16px',
    borderTop: '1px solid rgba(168,85,247,0.12)',
    background: 'rgba(13,6,22,0.6)',
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: '10px 14px',
    color: '#fff',
    fontSize: 13.5,
    fontFamily: 'inherit',
    resize: 'none',
  },
  sendBtn: (enabled) => ({
    width: 40,
    height: 40,
    borderRadius: 12,
    border: 'none',
    background: enabled
      ? 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
      : 'rgba(255,255,255,0.06)',
    cursor: enabled ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s, transform 0.15s',
    flexShrink: 0,
  }),
}


/* ─── keyframes (injected once) ─── */
const keyframesId = '__cb_keyframes'
if (typeof document !== 'undefined' && !document.getElementById(keyframesId)) {
  const sheet = document.createElement('style')
  sheet.id = keyframesId
  sheet.textContent = `
    @keyframes cbPulse {
      0%, 100% { transform: scale(1); opacity: 0.4; }
      50%      { transform: scale(1.45); opacity: 0; }
    }
    @keyframes cbBounce {
      0%, 60%, 100% { transform: translateY(0); }
      30%           { transform: translateY(-6px); }
    }
    .cb-code-block {
      background: rgba(0,0,0,0.35);
      border-radius: 8px;
      padding: 10px 12px;
      overflow-x: auto;
      font-size: 12px;
      font-family: 'Fira Code', monospace;
      margin: 6px 0;
      display: block;
      white-space: pre-wrap;
    }
    .cb-inline-code {
      background: rgba(168,85,247,0.18);
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12.5px;
      font-family: 'Fira Code', monospace;
    }
    .cb-list {
      margin: 4px 0;
      padding-left: 18px;
      list-style: disc;
    }
    .cb-list li {
      margin: 2px 0;
    }
    .cb-messages-scroll::-webkit-scrollbar {
      width: 4px;
    }
    .cb-messages-scroll::-webkit-scrollbar-thumb {
      background: rgba(168,85,247,0.3);
      border-radius: 4px;
    }
    .cb-messages-scroll::-webkit-scrollbar-track {
      background: transparent;
    }
  `
  document.head.appendChild(sheet)
}


export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])      // { role: 'user'|'model', text }
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [fabHover, setFabHover] = useState(false)
  const messagesEnd = useRef(null)
  const inputRef = useRef(null)

  // auto-scroll on new message
  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // focus input when panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', text: trimmed }
    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      const res = await chatApi.send(trimmed, messages)
      const botMsg = { role: 'model', text: res.data.reply }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      const errMsg = err.response?.data?.reply || err.message || 'Unknown error'
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: `⚠️ ${errMsg}` },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* ── Floating Action Button ── */}
      <button
        id="chatbot-fab"
        style={{ ...styles.fab, ...(fabHover ? styles.fabHover : {}) }}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setFabHover(true)}
        onMouseLeave={() => setFabHover(false)}
        aria-label="Open chat assistant"
      >
        {!open && <span style={styles.fabPulse} />}
        {open
          ? <X size={24} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
          : <MessageCircle size={26} color="#fff" style={{ position: 'relative', zIndex: 1 }} />
        }
      </button>

      {/* ── Chat Panel ── */}
      <div style={styles.panel(open)}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerIcon}>
            <Sparkles size={18} color="#fff" />
          </div>
          <div>
            <div style={styles.headerTitle}>SkillSphere AI</div>
            <div style={styles.headerSub}>Your learning assistant</div>
          </div>
          <button
            style={styles.closeBtn}
            onClick={() => setOpen(false)}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.color = '#fff'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
            }}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={styles.messages} className="cb-messages-scroll">
          {messages.length === 0 && !loading && (
            <div style={styles.welcomeMsg}>
              <div style={styles.welcomeIcon}>
                <Bot size={26} color="#a855f7" />
              </div>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: 6, fontSize: 15 }}>
                Hi! I'm SkillSphere AI 👋
              </div>
              Ask me anything about courses, learning tips, or how to navigate the platform.
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} style={styles.msgRow(msg.role === 'user')}>
              <div style={styles.msgAvatar(msg.role === 'user')}>
                {msg.role === 'user'
                  ? <User size={14} color="#a855f7" />
                  : <Bot size={14} color="#fff" />
                }
              </div>
              <div
                style={styles.msgBubble(msg.role === 'user')}
                dangerouslySetInnerHTML={
                  msg.role === 'model'
                    ? { __html: renderMarkdown(msg.text) }
                    : undefined
                }
              >
                {msg.role === 'user' ? msg.text : undefined}
              </div>
            </div>
          ))}

          {loading && (
            <div style={styles.msgRow(false)}>
              <div style={styles.msgAvatar(false)}>
                <Bot size={14} color="#fff" />
              </div>
              <div style={{ ...styles.msgBubble(false), ...styles.typing }}>
                <span style={styles.dot(0)} />
                <span style={styles.dot(1)} />
                <span style={styles.dot(2)} />
              </div>
            </div>
          )}

          <div ref={messagesEnd} />
        </div>

        {/* Input */}
        <div style={styles.inputBar}>
          <input
            ref={inputRef}
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            disabled={loading}
          />
          <button
            id="chatbot-send"
            style={styles.sendBtn(input.trim().length > 0 && !loading)}
            onClick={handleSend}
            disabled={!input.trim() || loading}
            onMouseEnter={(e) => {
              if (input.trim() && !loading) e.currentTarget.style.transform = 'scale(1.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
            aria-label="Send message"
          >
            <Send size={18} color="#fff" />
          </button>
        </div>
      </div>
    </>
  )
}
