'use client'

import { useState, useEffect, useCallback } from 'react'
import { Delete, Clock, X, RotateCcw } from 'lucide-react'

const HISTORY_KEY = 'calc_history'

export default function Page() {
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [justCalculated, setJustCalculated] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(HISTORY_KEY)
      if (saved) setHistory(JSON.parse(saved))
    } catch {}
  }, [])

  const saveHistory = (items) => {
    setHistory(items)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items))
  }

  const handleNumber = useCallback((val) => {
    setError(false)
    if (justCalculated) {
      setDisplay(val)
      setExpression('')
      setJustCalculated(false)
      return
    }
    setDisplay(prev => {
      if (prev === '0' && val !== '.') return val
      if (val === '.' && prev.includes('.')) return prev
      if (prev.length >= 15) return prev
      return prev + val
    })
  }, [justCalculated])

  const handleOperator = useCallback((op) => {
    setError(false)
    setJustCalculated(false)
    const current = parseFloat(display)
    const expr = expression
    if (expr && !justCalculated) {
      const lastChar = expr.trim().slice(-1)
      if (['+', '-', '×', '÷'].includes(lastChar)) {
        setExpression(expr.slice(0, -2) + op + ' ')
        return
      }
    }
    setExpression((justCalculated ? display : (expr || display)) + ' ' + op + ' ')
    setDisplay('0')
    setJustCalculated(false)
  }, [display, expression, justCalculated])

  const handleEquals = useCallback(() => {
    if (!expression) return
    try {
      const fullExpr = expression + display
      const evalExpr = fullExpr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
      
      // Safe evaluation
      const tokens = evalExpr.match(/(-?\d+\.?\d*|[+\-*/])/g)
      if (!tokens) return

      let result = parseFloat(tokens[0])
      for (let i = 1; i < tokens.length - 1; i += 2) {
        const op = tokens[i]
        const next = parseFloat(tokens[i + 1])
        if (op === '+') result += next
        else if (op === '-') result -= next
        else if (op === '*') result *= next
        else if (op === '/') {
          if (next === 0) { setError(true); setDisplay('Error'); setExpression(''); return }
          result /= next
        }
      }

      const resultStr = Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(10)).toString()

      const entry = { id: Date.now(), expression: fullExpr, result: resultStr, time: new Date().toLocaleTimeString() }
      saveHistory(prev => {
        const updated = [entry, ...prev].slice(0, 50)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
        return updated
      })
      setHistory(prev => {
        const updated = [entry, ...prev].slice(0, 50)
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
        return updated
      })

      setDisplay(resultStr)
      setExpression(fullExpr + ' =')
      setJustCalculated(true)
    } catch {
      setError(true)
      setDisplay('Error')
      setExpression('')
    }
  }, [display, expression])

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
    setJustCalculated(false)
    setError(false)
  }

  const handleBackspace = useCallback(() => {
    if (justCalculated || error) { handleClear(); return }
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0')
  }, [justCalculated, error])

  const handleToggleSign = () => {
    setDisplay(prev => {
      const n = parseFloat(prev)
      if (isNaN(n)) return prev
      return (-n).toString()
    })
  }

  const handlePercent = () => {
    setDisplay(prev => {
      const n = parseFloat(prev)
      if (isNaN(n)) return prev
      return (n / 100).toString()
    })
  }

  const deleteHistoryItem = (id) => {
    setHistory(prev => {
      const updated = prev.filter(h => h.id !== id)
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const clearAllHistory = () => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }

  const useHistoryResult = (result) => {
    setDisplay(result)
    setExpression('')
    setJustCalculated(true)
    setShowHistory(false)
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key)
      else if (e.key === '.') handleNumber('.')
      else if (e.key === '+') handleOperator('+')
      else if (e.key === '-') handleOperator('-')
      else if (e.key === '*') handleOperator('×')
      else if (e.key === '/') { e.preventDefault(); handleOperator('÷') }
      else if (e.key === 'Enter' || e.key === '=') handleEquals()
      else if (e.key === 'Backspace') handleBackspace()
      else if (e.key === 'Escape') handleClear()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [handleNumber, handleOperator, handleEquals, handleBackspace])

  const displayFontSize = display.length > 12 ? '1.4rem' : display.length > 8 ? '1.8rem' : '2.4rem'

  const buttons = [
    { label: 'AC', action: handleClear, type: 'fn', wide: false },
    { label: '+/-', action: handleToggleSign, type: 'fn' },
    { label: '%', action: handlePercent, type: 'fn' },
    { label: '÷', action: () => handleOperator('÷'), type: 'op' },
    { label: '7', action: () => handleNumber('7'), type: 'num' },
    { label: '8', action: () => handleNumber('8'), type: 'num' },
    { label: '9', action: () => handleNumber('9'), type: 'num' },
    { label: '×', action: () => handleOperator('×'), type: 'op' },
    { label: '4', action: () => handleNumber('4'), type: 'num' },
    { label: '5', action: () => handleNumber('5'), type: 'num' },
    { label: '6', action: () => handleNumber('6'), type: 'num' },
    { label: '-', action: () => handleOperator('-'), type: 'op' },
    { label: '1', action: () => handleNumber('1'), type: 'num' },
    { label: '2', action: () => handleNumber('2'), type: 'num' },
    { label: '3', action: () => handleNumber('3'), type: 'num' },
    { label: '+', action: () => handleOperator('+'), type: 'op' },
    { label: '0', action: () => handleNumber('0'), type: 'num', wide: true },
    { label: '.', action: () => handleNumber('.'), type: 'num' },
    { label: '=', action: handleEquals, type: 'eq' },
  ]

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#111113',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '20px',
    },
    wrapper: {
      display: 'flex',
      gap: '16px',
      alignItems: 'flex-start',
    },
    calculator: {
      width: '320px',
      background: '#1c1c1f',
      borderRadius: '24px',
      border: '1px solid #2e2e33',
      overflow: 'hidden',
      boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
    },
    displayArea: {
      padding: '28px 24px 16px',
      background: '#111113',
      borderBottom: '1px solid #2e2e33',
    },
    expressionRow: {
      minHeight: '20px',
      color: '#71717a',
      fontSize: '0.75rem',
      textAlign: 'right',
      marginBottom: '8px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
    },
    displayRow: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '8px',
    },
    mainDisplay: {
      flex: 1,
      textAlign: 'right',
      fontSize: displayFontSize,
      fontWeight: '300',
      color: error ? '#f87171' : '#f4f4f5',
      letterSpacing: '-0.02em',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      transition: 'font-size 0.1s ease',
    },
    backspaceBtn: {
      background: 'none',
      border: 'none',
      color: '#71717a',
      cursor: 'pointer',
      padding: '4px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      transition: 'color 0.15s',
      flexShrink: 0,
    },
    btnGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '1px',
      background: '#2e2e33',
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 20px 10px',
      background: '#111113',
    },
    title: {
      fontSize: '0.75rem',
      fontWeight: '500',
      color: '#52525b',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
    historyBtn: {
      background: 'none',
      border: 'none',
      color: '#71717a',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.7rem',
      padding: '4px 8px',
      borderRadius: '8px',
      transition: 'background 0.15s, color 0.15s',
    },
    historyPanel: {
      width: '260px',
      background: '#1c1c1f',
      borderRadius: '20px',
      border: '1px solid #2e2e33',
      overflow: 'hidden',
      maxHeight: '480px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
    },
    historyHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 16px 12px',
      borderBottom: '1px solid #2e2e33',
      background: '#111113',
    },
    historyTitle: {
      color: '#a1a1aa',
      fontSize: '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    historyList: {
      overflowY: 'auto',
      flex: 1,
    },
    historyItem: {
      padding: '12px 16px',
      borderBottom: '1px solid #2e2e33',
      cursor: 'pointer',
      transition: 'background 0.15s',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '8px',
    },
    historyExpr: {
      color: '#52525b',
      fontSize: '0.7rem',
      marginBottom: '2px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    historyResult: {
      color: '#f4f4f5',
      fontSize: '1rem',
      fontWeight: '300',
    },
    historyTime: {
      color: '#3f3f46',
      fontSize: '0.6rem',
      marginTop: '2px',
    },
    emptyHistory: {
      color: '#3f3f46',
      fontSize: '0.8rem',
      textAlign: 'center',
      padding: '40px 20px',
    },
    clearHistBtn: {
      background: 'none',
      border: 'none',
      color: '#52525b',
      cursor: 'pointer',
      fontSize: '0.65rem',
      padding: '4px 8px',
      borderRadius: '6px',
      transition: 'color 0.15s',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    deleteItemBtn: {
      background: 'none',
      border: 'none',
      color: '#3f3f46',
      cursor: 'pointer',
      padding: '2px',
      borderRadius: '4px',
      display: 'flex',
      flexShrink: 0,
      transition: 'color 0.15s',
    }
  }

  const getButtonStyle = (type, wide, hovered) => {
    const base = {
      border: 'none',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: type === 'fn' ? '400' : '300',
      transition: 'filter 0.1s ease, transform 0.08s ease',
      padding: '0',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '-0.01em',
      transform: hovered ? 'scale(0.95)' : 'scale(1)',
      userSelect: 'none',
    }
    if (wide) {
      base.gridColumn = 'span 2'
      base.justifyContent = 'flex-start'
      base.paddingLeft = '28px'
    }
    if (type === 'op') return { ...base, background: '#2a2a2f', color: '#a78bfa', fontSize: '1.3rem' }
    if (type === 'eq') return { ...base, background: '#6366f1', color: '#ffffff', fontSize: '1.3rem' }
    if (type === 'fn') return { ...base, background: '#27272a', color: '#a1a1aa', fontSize: '0.95rem' }
    return { ...base, background: '#1c1c1f', color: '#f4f4f5' }
  }

  const [hoveredBtn, setHoveredBtn] = useState(null)

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.calculator}>
          <div style={styles.topBar}>
            <span style={styles.title}>Calc</span>
            <button
              style={{
                ...styles.historyBtn,
                color: showHistory ? '#a78bfa' : '#71717a',
                background: showHistory ? 'rgba(167,139,250,0.1)' : 'transparent',
              }}
              onClick={() => setShowHistory(s => !s)}
            >
              <Clock size={13} />
              <span>History</span>
            </button>
          </div>

          <div style={styles.displayArea}>
            <div style={styles.expressionRow}>{expression || '\u00A0'}</div>
            <div style={styles.displayRow}>
              <button
                style={styles.backspaceBtn}
                onClick={handleBackspace}
                onMouseEnter={e => e.currentTarget.style.color = '#f4f4f5'}
                onMouseLeave={e => e.currentTarget.style.color = '#71717a'}
              >
                <Delete size={18} />
              </button>
              <div style={styles.mainDisplay}>{display}</div>
            </div>
          </div>

          <div style={styles.btnGrid}>
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                style={getButtonStyle(btn.type, btn.wide, hoveredBtn === idx)}
                onClick={btn.action}
                onMouseEnter={() => setHoveredBtn(idx)}
                onMouseLeave={() => setHoveredBtn(null)}
                onMouseDown={e => {
                  e.currentTarget.style.filter = 'brightness(0.8)'
                  e.currentTarget.style.transform = 'scale(0.93)'
                }}
                onMouseUp={e => {
                  e.currentTarget.style.filter = 'brightness(1)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {showHistory && (
          <div style={styles.historyPanel}>
            <div style={styles.historyHeader}>
              <span style={styles.historyTitle}>History</span>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {history.length > 0 && (
                  <button
                    style={styles.clearHistBtn}
                    onClick={clearAllHistory}
                    onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                    onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
                  >
                    <RotateCcw size={10} />
                    Clear all
                  </button>
                )}
                <button
                  style={{ ...styles.deleteItemBtn, color: '#52525b' }}
                  onClick={() => setShowHistory(false)}
                  onMouseEnter={e => e.currentTarget.style.color = '#f4f4f5'}
                  onMouseLeave={e => e.currentTarget.style.color = '#52525b'}
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div style={styles.historyList}>
              {history.length === 0 ? (
                <div style={styles.emptyHistory}>No calculations yet</div>
              ) : (
                history.map(item => (
                  <div
                    key={item.id}
                    style={styles.historyItem}
                    onClick={() => useHistoryResult(item.result)}
                    onMouseEnter={e => e.currentTarget.style.background = '#27272a'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={styles.historyExpr}>{item.expression}</div>
                      <div style={styles.historyResult}>{item.result}</div>
                      <div style={styles.historyTime}>{item.time}</div>
                    </div>
                    <button
                      style={styles.deleteItemBtn}
                      onClick={e => { e.stopPropagation(); deleteHistoryItem(item.id) }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                      onMouseLeave={e => e.currentTarget.style.color = '#3f3f46'}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}